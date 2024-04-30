from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerielizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_date):
        user = User.objects.create_user(**validated_date)
        return user
    
class NoteSerielizer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only":True}}