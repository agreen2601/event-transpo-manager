'''
A django page to handle all entries fetch calls

'''
from django.http import HttpResponse
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from django.db import models
from trackerapp.models import Entry, Place, Date
from django.contrib.auth.models import User
import json


class EntrySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Entry
        url = serializers.HyperlinkedIdentityField(
            view_name='entry',
            lookup_field='id'
        )
        fields = ('id', 'time', 'attendee_count', 'vehicle_number', 'date_id',
                  'shuttle_id', 'place_id', 'user_id', 'date', 'shuttle', 'place', 'user')
        depth = 2


class Entries(ViewSet):

    '''' a class to handle all the entries viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized entry instance'''

        newentry = Entry()
        newentry.date_id = request.data["date_id"]
        newentry.time = request.data["time"]
        newentry.attendee_count = request.data["attendee_count"]
        newentry.vehicle_number = request.data["vehicle_number"]
        newentry.shuttle_id = request.data["shuttle_id"]
        newentry.place_id = request.data["place_id"]
        newuser = request.auth.user
        newentry.user = newuser
        newentry.save()

        serializer = EntrySerializer(
            newentry, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        entries = Entry.objects.all()

        # handles fetching list of all entries from a certain place
        place_id = self.request.query_params.get('placeID', None)
        if place_id is not None:
            entries = entries.filter(place_id=place_id)

        # handles fetching list of all entries from a certain shuttle
        shuttle_id = self.request.query_params.get('shuttleID', None)
        if shuttle_id is not None:
            entries = entries.filter(shuttle_id=shuttle_id)

        # handles fetching list of all entries from a certain user
        user_id = self.request.query_params.get('userID', None)
        if user_id is not None:
            entries = entries.filter(user_id=user_id)

        # handles fetching list of all entries from a certain date
        date_id = self.request.query_params.get('dateID', None)
        if date_id is not None:
            entries = entries.filter(date_id=date_id)

        serializer = EntrySerializer(
            entries, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        '''handles fetching only one entry'''
        try:
            entry = Entry.objects.get(pk=pk)
            serializer = EntrySerializer(
                entry, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")

    def update(self, request, pk=None):

        ogEntry = Entry.objects.get(pk=pk)
        ogEntry.shuttle_id = request.data['shuttle_id']
        ogEntry.place_id = request.data['place_id']
        ogEntry.attendee_count = request.data['attendee_count']
        ogEntry.vehicle_number = request.data['vehicle_number']
        ogEntry.date_id = request.data['date_id']
        ogEntry.time = request.data['time']

        ogEntry.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):
        '''handles delete entry'''
        try:
            entry = Entry.objects.get(pk=pk)
            entry.delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)

        except Entry.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
