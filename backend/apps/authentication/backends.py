from django.contrib.auth.backends import ModelBackend
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()


class EmailOrUsernameBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        identifier = username or kwargs.get("login")

        if identifier is None or password is None:
            return None

        try:
            validate_email(identifier)
            user = User.objects.filter(email=identifier).first()
        except ValidationError:
            user = User.objects.filter(username=identifier).first()

        if user is None:
            return None

        if not user.check_password(password):
            return None

        if not self.user_can_authenticate(user):
            return None

        return user
