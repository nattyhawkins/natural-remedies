from django.contrib.auth import get_user_model
from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer
from .serializers.common import ValidatedUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated
# modules
from datetime import datetime, timedelta
import jwt

from django.conf import settings



# Create your views here.
User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        try:
            print(request.data)
            user_to_register = UserSerializer(data=request.data)
            if user_to_register.is_valid():
              user_to_register.save()
              
              return Response('Register Successful', status.HTTP_201_CREATED)
            return Response(user_to_register.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
          return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        try:
          user_to_login = User.objects.get(username=username)
        except User.DoesNotExist as e:
          raise PermissionDenied('Invalid Credentials')
        if not user_to_login.check_password(password):
          raise PermissionDenied('Invalid Credentials')
        dt = datetime.now() + timedelta(days=7)
        dt_secs = int(dt.strftime('%s'))
        token = jwt.encode(
          { 'sub': user_to_login.id, 'exp': dt_secs },
          settings.SECRET_KEY,
          'HS256'
        )

        return Response({
          'token': token,
          'message': f'Welcome back, {user_to_login.username}'
        }, status.HTTP_202_ACCEPTED)

class ProfileView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        try:
          user = User.objects.get(id=request.user.id)
          user = PopulatedUserSerializer(user)
          return Response(user.data)
        except User.DoesNotExist as e:
          print(e)
          raise NotFound(str(e))
    
    def put(self, request):
        try:
          user = User.objects.get(id=request.user.id)
          user = ValidatedUserSerializer(user, request.data, partial=True)
          if user.is_valid():
            user.save()
            return Response(user.data, status.HTTP_202_ACCEPTED)
          else:
            return Response(user.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except User.DoesNotExist as e:
          print(e)
          raise NotFound(str(e))
