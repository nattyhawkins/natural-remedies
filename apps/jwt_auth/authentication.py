from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import PermissionDenied
import jwt
from django.contrib.auth import get_user_model
from django.conf import settings
User = get_user_model()

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        if not request.headers:
          return None

        headers = request.headers.get('Authorization')
        if not headers: return None

        if not headers.startswith('Bearer '): raise PermissionDenied('Invalid Token')

        token = headers.replace('Bearer ', '')
        try:
          payload = jwt.decode(token, settings.SECRET_KEY, ['HS256'])
          user = User.objects.get(pk=payload['sub'])
        except User.DoesNotExist as e:
          raise PermissionDenied('User not found')
        # if fails return none
        except Exception as e:
          print(e)
          raise PermissionDenied(str(e))

        return (user, token)