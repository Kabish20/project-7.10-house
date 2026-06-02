import os
import base64
import urllib.request
import mimetypes
from django.core.management.base import BaseCommand
from django.conf import settings
from api.models import Product

def upload_to_catbox(img_bytes, ext):
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

class Command(BaseCommand):
    help = 'Heals product image URLs by uploading local files and base64 strings to Catbox.moe'

    def handle(self, *args, **kwargs):
        products = Product.objects.all()
        self.stdout.write(f"Found {products.count()} products to inspect...")

        project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
        frontend_public_dir = os.path.join(project_root, 'frontend', 'public')

        for product in products:
            if not product.image_url:
                continue

            self.stdout.write(f"Processing product: {product.name} (ID: {product.id})...")
            # Split urls safely using a look-ahead that avoids splitting base64 data strings
            image_urls = [u.strip() for u in product.image_url.split(',') if u.strip()]
            new_urls = []
            changed = False

            for url in image_urls:
                if url.startswith('http'):
                    new_urls.append(url)
                    continue

                img_bytes = None
                ext = 'png'

                if url.startswith('data:'):
                    # Handle base64
                    try:
                        if ';base64,' in url:
                            header, encoded = url.split(';base64,', 1)
                            ext = header.split('/')[-1]
                            if ext not in ('png', 'jpg', 'jpeg', 'webp', 'gif'):
                                ext = 'png'
                        else:
                            encoded = url
                        img_bytes = base64.b64decode(encoded)
                        self.stdout.write("  -> Detected Base64 image.")
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"  -> Failed to decode base64: {e}"))

                elif url.startswith('/media/'):
                    # Handle local media path
                    relative_path = url.replace('/media/', '', 1)
                    file_path = os.path.join(settings.MEDIA_ROOT, relative_path)
                    ext = os.path.splitext(file_path)[1].replace('.', '') or 'png'
                    if os.path.exists(file_path):
                        try:
                            with open(file_path, 'rb') as f:
                                img_bytes = f.read()
                            self.stdout.write(f"  -> Found local media file: {file_path}")
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f"  -> Failed to read local media file: {e}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"  -> Local media file not found: {file_path}"))

                else:
                    # Handle static fallback image from frontend public
                    relative_path = url.lstrip('/')
                    file_path = os.path.join(frontend_public_dir, relative_path)
                    ext = os.path.splitext(file_path)[1].replace('.', '') or 'png'
                    if os.path.exists(file_path):
                        try:
                            with open(file_path, 'rb') as f:
                                img_bytes = f.read()
                            self.stdout.write(f"  -> Found static fallback file: {file_path}")
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f"  -> Failed to read static fallback file: {e}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"  -> Static fallback file not found: {file_path}"))

                if img_bytes:
                    try:
                        self.stdout.write("  -> Uploading to Catbox.moe...")
                        catbox_url = upload_to_catbox(img_bytes, ext)
                        if catbox_url.startswith('http'):
                            new_urls.append(catbox_url)
                            changed = True
                            self.stdout.write(self.style.SUCCESS(f"  -> Success: {catbox_url}"))
                        else:
                            self.stdout.write(self.style.ERROR(f"  -> Invalid Catbox response: {catbox_url}"))
                            new_urls.append(url)
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"  -> Catbox upload failed: {e}"))
                        new_urls.append(url)
                else:
                    # Keep original if we couldn't resolve/load it
                    new_urls.append(url)

            if changed:
                product.image_url = ','.join(new_urls)
                product.save()
                self.stdout.write(self.style.SUCCESS(f"Updated product ID {product.id} image_url: {product.image_url}"))

        self.stdout.write(self.style.SUCCESS("Database image healing process completed!"))
