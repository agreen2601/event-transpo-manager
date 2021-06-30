'''
A django page to handle all areas fetch calls

'''
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from trackerapp.models import Area
from django.http import HttpResponse
import json


class AreaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Area
        url = serializers.HyperlinkedIdentityField(
            view_name='area',
            lookup_field='id'
        )
        fields = ('id', 'name')


class Areas(ViewSet):

    '''' a class to handle all the areas viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized area instance'''

        newarea = Area()
        newarea.name = request.data["name"]

        newarea.save()

        serializer = AreaSerializer(
            newarea, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        areas = Area.objects.all()

        serializer = AreaSerializer(
            areas, many=True, context={"request": request})
        return Response(serializer.data)

    def update(self, request, pk=None):

        ogarea = area.objects.get(pk=pk)
        ogarea.name = request.data['name']

        ogarea.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk=None):
        '''handles fetching ony one area'''
        try:
            area = Area.objects.get(pk=pk)
            serializer = AreaSerializer(
                area, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")

