from django.db import models

# Create your models here.
def upload_path(filename):
    return '/'.join(filename)
    
class Phonebook(models.Model):
    Name = models.CharField(max_length=200)
    ContactNumber = models.CharField(max_length=100, blank=True)
    Email = models.EmailField(max_length=100, unique=True)
    BirthDate = models.DateField(null=True, blank=True)
    Address = models.CharField(max_length=100, blank=True)
    Image = models.ImageField(default="default.jpg", null=True, blank=True, upload_to="")
    IsDeleted = models.BooleanField(default=False)

    def __str__(self):
        return self.Name
