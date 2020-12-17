from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import PrescriptionSerializerView, PrescriptionSerializerPost, PatientInformationSerializer, PatientDetailSerializer
from .models import Prescription, PatientInformation


@api_view(['POST', 'GET'])
def patients_active_info_list(request):

    if request.method == 'GET':
        obj = PatientInformation.objects.filter()
