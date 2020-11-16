from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import PrescriptionSerializerView, PrescriptionSerializerPost, PatientInformationSerializer, PatientDetailSerializer
from .models import Prescription, PatientInformation


#######    LIST API VIEW FOR SHOWING THE LIST OF ALL PRESCRIPTION AND PATIENT / POST METHOD FOR ADDING NEW PRESCRIPTION ##########
@api_view(['GET', 'POST'])
def patients_view(request):

    if request.method == 'GET':
        patient = PatientInformation.objects.all()
        serializer = PatientInformationSerializer(patient, many=True)
        
        print(serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'POST' :
        
        serializer = PatientInformationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Data is saving")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     print("Error in POST Method")
        #     content = {'Error': 'Invalid data'}
        #     return Response(content,status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#######    DETAIL API VIEW FOR SHOWING THE LIST OF PRESCRIPTION FOR EVERY PATIENT ##########
@api_view(['PUT', 'DELETE'])
def patient_info_detail(request, pk):
    
    if request.method == 'PUT':
        patient = PatientInformation.objects.get(id=pk)
        serializer = PatientDetailSerializer(instance=patient)
        print(serializer.data)
        return Response(serializer.data)
    
    else:
        content = {
            'Error' :' Patient Information Not Found'
        }
        return Response(content,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def prescription_view(request):

    if request.method == 'GET':
        prescription = Prescription.objects.all()
        serializer = PrescriptionSerializerView(prescription, many=True)
        
        print(serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'POST' :
        
        serializer = PrescriptionSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Data is saving")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     print("Error in POST Method")
        #     content = {'Error': 'Invalid data'}
        #     return Response(content,status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def prescription_update_or_delete(request, pk):
    if request.method == 'GET':
        obj = Prescription.objects.filter(id=pk)
        serializer = PrescriptionSerializerView(instance=obj, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        obj = Prescription.objects.get(id=pk)
        serializer = PrescriptionSerializerPost(instance=obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            content = {'Error': 'Invalid data'}
            return Response(content,status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

    elif request.method == 'DELETE' :
        obj = Prescription.objects.get(id=pk)
        obj.delete()
        return Response("PRescription successfully deleted")

@api_view(['POST'])
@permission_classes([AllowAny])
def prescriptionCreate(request):
    serializer = PrescriptionSerializerPost(data=request.data)
    if serializer.is_valid():
            serializer.save()
    else:
        content = {'Error': 'Invalid data'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)
