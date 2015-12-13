from django.contrib import admin
from .models import Gift, Volunteer


# Register all imported models in admin
for module in (Gift, Volunteer):
    admin.site.register(module)
