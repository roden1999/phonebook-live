from django.shortcuts import render
from django.http import JsonResponse

from .models import Phonebook
from rest_framework import viewsets, permissions

from .serializers import PhonebookSerializer

# Client Viewset  -  Allows to create full CRUD api without having to specify explicit method for the functionality
class PhonebookViewSet(viewsets.ModelViewSet):
    queryset = Phonebook.objects.all().order_by("Name")
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PhonebookSerializer

    def post(self, request, *args, **kwargs):
        image = request.data['Image']
        Phonebook.objects.create(image=image)