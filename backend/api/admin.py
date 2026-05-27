from django.contrib import admin
from .models import Category, Product, CustomRequest

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'is_featured', 'rating')
    list_filter = ('category', 'is_featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(CustomRequest)
class CustomRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'jersey_team', 'jersey_name', 'jersey_number', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'jersey_team', 'jersey_name')
