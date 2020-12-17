from django.shortcuts import render, redirect
from django.contrib import messages
from django import forms
import requests



def patient_list_view(request):
    
    template_name = "patient/patient_info_list.html"

    url = f"http://localhost:8000/api/patients-info-view/"
    response = requests.get(url)
    patient = response.json()

   
    context = {
        'patient' : patient,      
    } 

    return render(request, template_name, context)


def patient_active(request, pk):


    try:
        url =f"http://localhost:8000/api/patient-info-detail/{pk}/"
        payload = {
            "active": False,
        }
        response =  requests.put(url, data=payload)
    except:
        print("error")

    return redirect("prescriptions:patient_list_view")