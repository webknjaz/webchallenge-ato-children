from rest_framework import permissions


class AllowSubmitAny(permissions.DjangoModelPermissionsOrAnonReadOnly):
    """
    AllowSubmitAny extends default model access class and allows create one
    """
    def has_permission(self, request, view):
        return (request.method == 'POST' or
                super(AllowSubmitAny, self).has_permission(request, view))
