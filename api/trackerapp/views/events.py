'''
A django page to handle all events fetch calls

'''
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from trackerapp.models import Event
from django.http import HttpResponse
import json


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        url = serializers.HyperlinkedIdentityField(
            view_name='event',
            lookup_field='id'
        )
        fields = ('id', 'name', 'area_id')


class Events(ViewSet):

    '''' a class to handle all the events viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized event instance'''

        newevent = Event()
        newevent.name = request.data["name"]
        newevent.area_id = request.data["area_id"]

        newevent.save()

        serializer = EventSerializer(
            newevent, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        events = Event.objects.all()

        serializer = EventSerializer(
            events, many=True, context={"request": request})
        return Response(serializer.data)

    def update(self, request, pk=None):

        ogevent = event.objects.get(pk=pk)
        ogevent.name = request.data['name']
        ogevent.area_id = request.data['area_id']

        ogevent.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk=None):
        '''handles fetching ony one event'''
        try:
            event = Event.objects.get(pk=pk)
            serializer = EventSerializer(
                event, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")

