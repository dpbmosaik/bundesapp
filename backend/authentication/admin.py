from django.contrib import admin

from .models import ScoutHierarchy, ZipCode, ScoutOrgaLevel, EatHabitType

admin.site.register(ScoutOrgaLevel)
admin.site.register(EatHabitType)


@admin.register(ScoutHierarchy)
class ScoutHierarchyAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'zip_code', 'parent', 'level')
    list_filter = ('parent', 'level')
    search_fields = ('name',)


@admin.register(ZipCode)
class ZipCodeAdmin(admin.ModelAdmin):
    list_display = ('zip_code', 'city')
    search_fields = ('zip_code', 'city')
