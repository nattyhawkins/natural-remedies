from .serializers.common import CommentSerializer
from .models import Comment
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class CommentListView(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        request.data['owner'] = request.user.id
        try:
          new_comment = CommentSerializer(data=request.data)
          if new_comment.is_valid():
            new_comment.save()
            return Response(new_comment.data, status.HTTP_201_CREATED)
          return Response(new_comment.errors, status.HTTP_204_NO_CONTENT)
        except Exception as e:
          return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentDetailView(APIView):
    permission_classes = (IsAuthenticated, )
    def delete(self, request, pk):
        try:
          comment = Comment.objects.get(pk=pk)

          if comment.owner != request.user:
            raise PermissionDenied('Unauthorised')

          comment.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist as e:
          print(e)
          raise NotFound(str(e))

    def put(self, request, pk):
        try:
          comment = Comment.objects.get(pk=pk)

          if comment.owner != request.user:
            raise PermissionDenied('Unauthorised')

          comment = CommentSerializer(comment, request.data, partial=True)
          if comment.is_valid():
            comment.save()
            return Response(comment.data, status.HTTP_202_ACCEPTED)
          else:
            return Response(comment.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Comment.DoesNotExist as e:
          print(e)
          raise NotFound(str(e))
