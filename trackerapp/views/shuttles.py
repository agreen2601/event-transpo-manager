'''
A django page to handle all shuttles fetch calls

'''
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from trackerapp.models import Shuttle
from django.contrib.auth.models import User
from django.http import HttpResponse
import json


class ShuttleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Shuttle
        url = serializers.HyperlinkedIdentityField(
            view_name='shuttle',
            lookup_field='id'
        )
        fields = ('id', 'name')
        depth = 0


class Shuttles(ViewSet):

    '''' a class to handle all the shuttles viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized shuttle instance'''

        newshuttle = Shuttle()
        newshuttle.name = request.data["name"]

        newshuttle.save()

        serializer = ShuttleSerializer(
            newshuttle, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        shuttles = Shuttle.objects.all()

        serializer = ShuttleSerializer(
            shuttles, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        '''handles fetching ony one shuttle'''
        try:
            shuttle = Shuttle.objects.get(pk=pk)
            serializer = ShuttleSerializer(
                shuttle, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")

