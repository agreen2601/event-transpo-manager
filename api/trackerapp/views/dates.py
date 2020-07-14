'''
A django page to handle all dates fetch calls

'''
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from trackerapp.models import Date
from django.http import HttpResponse
import json


class DateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Date
        url = serializers.HyperlinkedIdentityField(
            view_name='date',
            lookup_field='id'
        )
        fields = ('id', 'date')


class Dates(ViewSet):

    '''' a class to handle all the dates viewset

    Arguments:
        ViewSet '''

    def create(self, request):
        ''' Handle POST operations and returns JSON serialized date instance'''

        newdate = Date()
        newdate.date = request.data["date"]
        newdate.save()

        serializer = DateSerializer(
            newdate, context={'request': request})

        return Response(serializer.data)

    def list(self, request):
        ''' handles get requests to server and returns a JSON response'''
        dates = Date.objects.all()

        serializer = DateSerializer(
            dates, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        '''handles fetching ony one date'''
        try:
            date = Date.objects.get(pk=pk)
            serializer = DateSerializer(
                date, many=False, context={'request': request})
            return Response(serializer.data)
        except Exception:
            return HttpResponse(json.dumps({"error": "Does Not Exist"}), content_type="application/json")
