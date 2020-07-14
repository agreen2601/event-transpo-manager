'''
A django page to handle all shuttledates fetch calls

'''
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from trackerapp.models import Date, Shuttle, ShuttleDate
from django.http import HttpResponse
import json


class ShuttleDateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ShuttleDate
        url = serializers.HyperlinkedIdentityField(
            view_name='shuttledate',
            lookup_field='id'
        )
        fields = ('id', 'shuttle_id', 'date_id', 'shuttle', 'date')
        depth = 1


class ShuttleDates(ViewSet):

    '''' a class to handle all the shuttledates viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized shuttledate instance'''

        newshuttledate = ShuttleDate()
        newshuttledate.shuttle_id = request.data["shuttle_id"]
        newshuttledate.date_id = request.data["date_id"]

        newshuttledate.save()

        serializer = ShuttleDateSerializer(
            newshuttledate, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        shuttledates = ShuttleDate.objects.all()

        serializer = ShuttleDateSerializer(
            shuttledates, many=True, context={"request": request})
        return Response(serializer.data)

    def update(self, request, pk=None):

        ogShuttleDate = ShuttleDate.objects.get(pk=pk)
        ogShuttleDate.shuttle_id = request.data['shuttle_id']
        ogShuttleDate.date_id = request.data['date_id']

        ogShuttleDate.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk=None):
        '''handles fetching ony one shuttledate'''
        try:
            shuttledate = ShuttleDate.objects.get(pk=pk)
            serializer = ShuttleDateSerializer(
                shuttledate, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")
