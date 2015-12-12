from django.contrib import admin
from .models import Gift, Volunteer, City


# Register all imported models in admin
for module in (Gift, Volunteer, City):
    admin.site.register(module)
