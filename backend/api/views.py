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


class ImageUploadView(APIView):
    """
    Accepts a JSON body: { "images": ["data:image/png;base64,...", ...] }
    Returns the base64 data URLs directly for 100% persistent database storage.
    Attempts to save to local media as a local backup where possible.
    """
    parser_classes = [JSONParser]

    def post(self, request):
        images_b64 = request.data.get('images', [])
        if not images_b64:
            return Response({'error': 'No images provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # Attempt to save a local backup copy on the local filesystem if writable
        try:
            jerseys_dir = os.path.join(settings.MEDIA_ROOT, 'jerseys')
            os.makedirs(jerseys_dir, exist_ok=True)
            for data_url in images_b64:
                if ';base64,' in data_url:
                    header, encoded = data_url.split(';base64,', 1)
                    ext = header.split('/')[-1]
                    if ext not in ('png', 'jpg', 'jpeg', 'webp', 'gif'):
                        ext = 'png'
                else:
                    encoded = data_url
                    ext = 'png'
                img_bytes = base64.b64decode(encoded)
                filename = f"{uuid.uuid4().hex}.{ext}"
                filepath = os.path.join(jerseys_dir, filename)
                with open(filepath, 'wb') as f:
                    f.write(img_bytes)
        except Exception:
            # Silently fallback to base64 if filesystem is read-only (like in Render runtime containers)
            pass

        # Return the original base64 strings so they are saved directly in the PostgreSQL DB
        return Response({'urls': images_b64}, status=status.HTTP_201_CREATED)

