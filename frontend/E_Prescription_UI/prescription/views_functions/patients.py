from django.shortcuts import render, redirect
from django.contrib import messages
from django import forms
import requests

class DateInput(forms.DateInput):
    input_type = 'date'

class PatientsForm(forms.Form):
    l_name = forms.CharField(max_length=100, label = "Last Name")
    f_name = forms.CharField(max_length=100, label = "First Name")
    age = forms.CharField(max_length=100, label = "Age")
    bday = forms.CharField(max_length=100, label = "Birthday" , widget=DateInput())
    contact = forms.CharField(max_length=100, label = "Contact")
    email = forms.CharField(max_length=100, label = "Email")
    active = forms.BooleanField(initial=True, required=False, label = "Active")

def patient_list_view(request):
    
    template_name = "patient/patient_info_list.html"
    form = PatientsForm()

    url = f"http://localhost:8000/patients-info-view/"
    response = requests.get(url)
    patient = response.json()

    if request.method == "POST":
        form = PatientsForm(request.POST)
        if form.is_valid():
            l_name = form.cleaned_data['l_name']
            f_name = form.cleaned_data['f_name']
            age = form.cleaned_data['age']
            bday = form.cleaned_data['bday']
            contact = form.cleaned_data['contact']
            email = form.cleaned_data['email']
            active = True

            url = "http://localhost:8000/patients-info-view/"
            payload = {
                "patient" : patient,
                "l_name" : l_name,
                "f_name" : f_name,
                "age" : age,
                "bday" : bday,
                "contact" : contact,
                "email" : email,
                "active" : active
            }
            response = requests.post(url, data=payload)
            if response.status_code == 200 or response.status_code == 201:
                messages.success(request, "Successfully added a prescription!")
                return redirect("prescriptions:patient_list_view")
            else:
                messages.error(request, "Invalid input! Please check.")
                
        else:
            messages.success(request, "Invalid Input! Please check")
            form = PatientsForm()

    context = {
        'patient' : patient, 
        'form' : form     
    } 

    return render(request, template_name, context)


def patient_active(request, pk):


    try:
        url =f"http://localhost:8000/patient-info-detail/{pk}/"
        payload = {
            "active": False,
        }
        response =  requests.put(url, data=payload)
    except:
        print("error")

    return redirect("prescriptions:patient_list_view")