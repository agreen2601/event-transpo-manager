'''
A django page to handle all drivers fetch calls

'''
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from trackerapp.models import Driver
from django.http import HttpResponse
import json


class DriverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Driver
        url = serializers.HyperlinkedIdentityField(
            view_name='driver',
            lookup_field='id'
        )
        fields = ('id', 'name', 'phone_number',
                  'isLocal', 'notes', 'area_id', 'area')
        depth = 2


class Drivers(ViewSet):

    '''' a class to handle all the drivers viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized driver instance'''

        newdriver = Driver()
        newdriver.name = request.data["name"]
        newdriver.phone_number = request.data["phone_number"]
        newdriver.isLocal = request.data["isLocal"]
        newdriver.notes = request.data["notes"]
        newdriver.area_id = request.data["area_id"]

        newdriver.save()

        serializer = DriverSerializer(
            newdriver, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        drivers = Driver.objects.all()

        serializer = DriverSerializer(
            drivers, many=True, context={"request": request})
        return Response(serializer.data)

    def update(self, request, pk=None):

        ogDriver = Driver.objects.get(pk=pk)
        ogDriver.name = request.data['name']
        ogDriver.phone_number = request.data['phone_number']
        ogDriver.isLocal = request.data['isLocal']
        ogDriver.notes = request.data['notes']
        ogDriver.area_id = request.data['area_id']

        ogDriver.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk=None):
        '''handles fetching ony one driver'''
        try:
            driver = Driver.objects.get(pk=pk)
            serializer = DriverSerializer(
                driver, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")
