from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, CustomRequestViewSet, AdminLoginView, ImageUploadView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'custom-requests', CustomRequestViewSet, basename='custom-request')

urlpatterns = [
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
    path('upload-images/', ImageUploadView.as_view(), name='upload-images'),
    path('', include(router.urls)),
]
