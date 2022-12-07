from .serializers.common import CommentSerializer
from .models import Comment
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status


class CommentListView(APIView):
    def post(self, request):
        new_comment = CommentSerializer(data=request.data)
        try:
          if new_comment.is_valid():
            new_comment.save()
            return Response(new_comment.data, status.HTTP_201_CREATED)
          return Response(new_comment.errors, status.HTTP_204_NO_CONTENT)
        except Exception as e:
          return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentDetailView(APIView):
    def delete(self, request, pk):
        try:
          comment = Comment.objects.get(pk=pk)
          comment.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist as e:
          print(e)
          raise NotFound(str(e))

    def put(self, request, pk):
        try:
          comment = Comment.objects.get(pk=pk)
          comment = CommentSerializer(comment, request.data, partial=True)
          if comment.is_valid():
            comment.save()
            return Response(comment.data, status.HTTP_202_ACCEPTED)
          else:
            return Response(comment.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Comment.DoesNotExist as e:
          print(e)
          raise NotFound(str(e))
