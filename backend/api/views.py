from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate
from django.conf import settings
from .models import Category, Product, CustomRequest
from .serializers import CategorySerializer, ProductSerializer, CustomRequestSerializer
import base64, uuid, os

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def get_queryset(self):
        queryset = Product.objects.select_related('category').all()
        category_slug = self.request.query_params.get('category', None)
        is_featured = self.request.query_params.get('featured', None)

        if category_slug is not None:
            queryset = queryset.filter(category__slug=category_slug)
        if is_featured is not None:
            queryset = queryset.filter(is_featured=is_featured.lower() == 'true')

        return queryset

class CustomRequestViewSet(viewsets.ModelViewSet):
    queryset = CustomRequest.objects.all()
    serializer_class = CustomRequestSerializer

class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None and user.is_staff:
            return Response({
                'success': True,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff
            }, status=status.HTTP_200_OK)
        return Response({
            'success': False,
            'message': 'Invalid credentials or not authorized as admin.'
        }, status=status.HTTP_401_UNAUTHORIZED)


def upload_to_catbox(img_bytes, ext):
    import urllib.request
    import mimetypes
    boundary = b'----WebKitFormBoundary7MA4YWxkTrZu0gW'
    
    body = []
    body.append(b'--' + boundary)
    body.append(b'Content-Disposition: form-data; name="reqtype"')
    body.append(b'')
    body.append(b'fileupload')
    body.append(b'--' + boundary)
    body.append(f'Content-Disposition: form-data; name="fileToUpload"; filename="image.{ext}"'.encode('utf-8'))
    
    mime_type = mimetypes.types_map.get(f'.{ext}', 'image/png')
    body.append(f'Content-Type: {mime_type}'.encode('utf-8'))
    body.append(b'')
    body.append(img_bytes)
    body.append(b'--' + boundary + b'--')
    body.append(b'')
    
    body_bytes = b'\r\n'.join(body)
    
    req = urllib.request.Request(
        'https://catbox.moe/user/api.php',
        data=body_bytes,
        headers={
            'Content-Type': f'multipart/form-data; boundary={boundary.decode("utf-8")}',
            'User-Agent': 'Mozilla/5.0'
        }
    )
    
    with urllib.request.urlopen(req) as response:
        return response.read().decode('utf-8').strip()


class ImageUploadView(APIView):
    """
    Accepts a JSON body: { "images": ["data:image/png;base64,...", ...] }
    Saves images to local media directory and returns the resolved media URLs.
    If the filesystem is read-only, uploads to Catbox to return a permanent public link.
    """
    parser_classes = [JSONParser]

    def post(self, request):
        images_b64 = request.data.get('images', [])
        if not images_b64:
            return Response({'error': 'No images provided.'}, status=status.HTTP_400_BAD_REQUEST)

        urls = []
        for data_url in images_b64:
            try:
                if ';base64,' in data_url:
                    header, encoded = data_url.split(';base64,', 1)
                    raw_ext = header.split('/')[-1]
                    raw_ext = raw_ext.split('+')[0] if '+' in raw_ext else raw_ext
                    ext = ''.join(c for c in raw_ext if c.isalnum()).lower()
                    if not ext:
                        ext = 'png'
                else:
                    encoded = data_url
                    ext = 'png'
                img_bytes = base64.b64decode(encoded)

                # Try Catbox upload first for a permanent, public link
                try:
                    catbox_url = upload_to_catbox(img_bytes, ext)
                    if catbox_url.startswith('http'):
                        urls.append(catbox_url)
                    else:
                        raise ValueError("Invalid Catbox response")
                except Exception as catbox_err:
                    # Fallback: on Render, return base64 URL directly to prevent dynamic media files loss on container restart.
                    # Otherwise, save locally on development machine.
                    if getattr(settings, 'IS_RENDER', False):
                        urls.append(data_url)
                    else:
                        try:
                            jerseys_dir = os.path.join(settings.MEDIA_ROOT, 'jerseys')
                            os.makedirs(jerseys_dir, exist_ok=True)
                            filename = f"{uuid.uuid4().hex}.{ext}"
                            filepath = os.path.join(jerseys_dir, filename)
                            with open(filepath, 'wb') as f:
                                f.write(img_bytes)
                            urls.append(f"/media/jerseys/{filename}")
                        except Exception as local_err:
                            urls.append(data_url)
            except Exception:
                urls.append(data_url)

        return Response({'urls': urls}, status=status.HTTP_201_CREATED)

