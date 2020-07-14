'''
A django page to handle all assignments fetch calls

'''
from django.http import HttpResponse
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from django.db import models
from trackerapp.models import Assignment, Driver, Vehicle, Route, Date
import json


class AssignmentSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Assignment
        url = serializers.HyperlinkedIdentityField(
            view_name='assignment',
            lookup_field='id'
        )
        fields = ('id', 'date_id', 'start_time', 'end_time', 'driver_id', 'vehicle_id',
                  'route_id', 'date', 'driver', 'vehicle', 'route', 'date')
        depth = 1


class Assignments(ViewSet):

    '''' a class to handle all the assignments viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized assignment instance'''

        newassignment = Assignment()
        newassignment.date_id = request.data["date_id"]
        newassignment.start_time = request.data["start_time"]
        newassignment.end_time = request.data["end_time"]
        newassignment.driver_id = request.data["driver_id"]
        newassignment.vehicle_id = request.data["vehicle_id"]
        newassignment.route_id = request.data["route_id"]
        newassignment.save()

        serializer = AssignmentSerializer(
            newassignment, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        assignments = Assignment.objects.all()

        # handles fetching list of all assignments from a certain date
        date_id = self.request.query_params.get('dateID', None)
        if date_id is not None:
            assignments = assignments.filter(date_id=date_id)

        # handles fetching list of all assignments from a certain route
        route_id = self.request.query_params.get('routeID', None)
        if route_id is not None:
            assignments = assignments.filter(route_id=route_id)

        # handles fetching list of all assignments from a certain driver
        driver_id = self.request.query_params.get('driverID', None)
        if driver_id is not None:
            assignments = assignments.filter(driver_id=driver_id)

        serializer = AssignmentSerializer(
            assignments, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        '''handles fetching only one assignment'''
        try:
            assignment = Assignment.objects.get(pk=pk)
            serializer = AssignmentSerializer(
                assignment, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")

    def update(self, request, pk=None):

        ogAssignment = Assignment.objects.get(pk=pk)
        ogassignment.date_id = request.data["date_id"]
        ogassignment.start_time = request.data["start_time"]
        ogassignment.end_time = request.data["end_time"]
        ogassignment.driver_id = request.data["driver_id"]
        ogassignment.vehicle_id = request.data["vehicle_id"]
        ogassignment.route_id = request.data["route_id"]

        ogAssignment.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):
        '''handles delete assignment'''
        try:
            assignment = Assignment.objects.get(pk=pk)
            assignment.delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)

        except Assignment.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
