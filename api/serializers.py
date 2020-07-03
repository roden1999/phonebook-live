from rest_framework import serializers
from .models import Phonebook

# Lead Serializer
class PhonebookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phonebook
        fields = '__all__'