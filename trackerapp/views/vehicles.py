'''
A django page to handle all vehicles fetch calls

'''
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from trackerapp.models import Vehicle
from django.http import HttpResponse
import json


class VehicleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vehicle
        url = serializers.HyperlinkedIdentityField(
            view_name='vehicle',
            lookup_field='id'
        )
        fields = ('id', 'company', 'number', 'kind', 'capacity', 'isAda')


class Vehicles(ViewSet):

    '''' a class to handle all the vehicles viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized vehicle instance'''

        newvehicle = Vehicle()
        newvehicle.company = request.data["company"]
        newvehicle.number = request.data["number"]
        newvehicle.kind = request.data["kind"]
        newvehicle.capacity = request.data["capacity"]
        newvehicle.isAda = request.data["isAda"]

        newvehicle.save()

        serializer = VehicleSerializer(
            newvehicle, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        vehicles = Vehicle.objects.all()

        serializer = VehicleSerializer(
            vehicles, many=True, context={"request": request})
        return Response(serializer.data)

    def update(self, request, pk=None):

        ogVehicle = Vehicle.objects.get(pk=pk)
        ogVehicle.company = request.data["company"]
        ogVehicle.number = request.data["number"]
        ogVehicle.kind = request.data["kind"]
        ogVehicle.capacity = request.data["capacity"]
        ogVehicle.isAda = request.data["isAda"]

        ogVehicle.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, pk=None):
        '''handles fetching ony one vehicle'''
        try:
            vehicle = Vehicle.objects.get(pk=pk)
            serializer = VehicleSerializer(
                vehicle, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")
