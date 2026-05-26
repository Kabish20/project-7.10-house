from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    image_url = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    colors = models.CharField(max_length=200, help_text="Comma-separated colors, e.g. Red, Blue")
    is_featured = models.BooleanField(default=False)
    stats = models.JSONField(default=dict, blank=True, help_text="JSON of stats, e.g., {'ranking': 2, 'founded': 1899, 'country': 'Spain'}")
    details = models.JSONField(default=list, blank=True, help_text="List of product details/specifications")

    def __str__(self):
        return self.name

class CustomRequest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    jersey_name = models.CharField(max_length=100)
    jersey_number = models.IntegerField()
    jersey_team = models.CharField(max_length=100)
    quantity = models.IntegerField(default=1)
    details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Custom Request for {self.jersey_name} (#{self.jersey_number}) by {self.name}"
