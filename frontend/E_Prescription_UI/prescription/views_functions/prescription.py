from django.shortcuts import render, redirect
from django.contrib import messages
from django import forms
import requests
import datetime
from django.utils import timezone
import pytz

utc=pytz.UTC
now = timezone.now()


class DateInput(forms.DateInput):
    input_type = 'date'

class PrescriptionForms(forms.Form):
    drug_name = forms.CharField(max_length = 100, label = "Medicine Name", widget=forms.TextInput(attrs={'placeholder': 'Ex. Aspirin'}))
    dosage = forms.CharField(max_length = 100, label = "Dosage" , widget=forms.TextInput(attrs={'placeholder': 'Ex. 10'}))
    route = forms.CharField(max_length = 100, label = "Route" , widget=forms.TextInput(attrs={'placeholder': 'Ex. Daily'}))
    frequency = forms.CharField(max_length = 100, label = "Frequency" , widget=forms.TextInput(attrs={'placeholder': 'Ex. 3 times'}))
    amount_dispensed = forms.CharField(max_length = 100, label = "Amount Dispensed" , widget=forms.TextInput(attrs={'placeholder': 'Ex. 4'}))
    no_of_refills =forms.CharField(max_length = 100,label = "No of Refills" , widget=forms.TextInput(attrs={'placeholder': 'Ex. 3'}))
    expiration_date = forms.DateField( widget=DateInput(), label = "Expiration Date")
    notes = forms.CharField(max_length=255, label = 'Notes', widget=forms.Textarea())
    active = forms.BooleanField(initial=True, required=False)

    def clean(self):
        cleaned_data = super().clean()
        expiration = cleaned_data.get("expiration_date")

        if expiration < datetime.date.today():
            print("Error in setting the expiration date")
            raise forms.ValidationError("Expiration Date should not be later than date today")
    
def homepage(request):
    template_name = "prescription/homepage.html"

    # url = "http://localhost:8000/api/prescription-view/"
    # response = requests.get(url)
    # result = response.json()

    # print(result)
    context = {
        # 'result' : result
    }

    return render(request, template_name, context)



def prescription_list_view(request, pk):
    today = datetime.date.today()
    print(today)
    
    template_name = "prescription/prescription_list.html"
    form = PrescriptionForms()
    
    url = f"http://localhost:8000/api/patient-info-detail/{pk}/"
    response = requests.get(url)
    patient = response.json()
    # print(patient)
    url = f"http://localhost:8000/api/patient-info-detail/{pk}/"
    response = requests.get(url)
    result = response.json()['patient_prescription']

    url = f"http://localhost:8000/api/patient-info-detail/{pk}/"
    response = requests.get(url)
    notes = response.json()['patients_notes']

    if request.method == "POST":
        form = PrescriptionForms(request.POST)
        if form.is_valid():
            patient = pk
            drug_name = form.cleaned_data['drug_name']
            dosage = form.cleaned_data['dosage']
            route = form.cleaned_data['route']
            frequency = form.cleaned_data['frequency']
            amount_dispensed = form.cleaned_data['amount_dispensed']
            no_of_refills = form.cleaned_data['no_of_refills']
            expiration_date = form.cleaned_data['expiration_date']
            notes = form.cleaned_data['notes']
            active = True

            url = "http://localhost:8000/api/prescription-view/"
            payload = {
                "patient" : patient,
                "drug_name" : drug_name,
                "dosage" : dosage,
                "route" : route,
                "frequency" : frequency,
                "amount_dispensed" : amount_dispensed,
                "no_of_refills" : no_of_refills,
                "expiration_date" : expiration_date,
                "notes" : notes,
                "active" : active
            }
            response = requests.post(url, data=payload)
            if response.status_code == 200 or response.status_code == 201:
                messages.success(request, "Successfully added a prescription!")
                return redirect("prescriptions:prescription_list_view" , pk)
            else:
                messages.error(request, 'Invalid input! Please check !')
                form = PrescriptionForms()
                
        else:
            
            if form.errors:
                messages.success(request, form.errors)
                messages.error(request, 'Invalid input! Please check !')
                form = PrescriptionForms()
            else:
                messages.error(request, 'Invalid input! Please check !')
                form = PrescriptionForms()
            

    # print(result)
    context = {
        'result' : result,
        'patient' : patient,      
        'pk' : pk,
        'form' : form, 
        'today' : today
    }  
   
    return render(request, template_name, context)



    

def add_prescription(request, pk):
    template_name = "prescription/add_prescription_form.html"
    form = PrescriptionForms()
    
    if request.method == "POST":
        form = PrescriptionForms(request.POST)
        if form.is_valid():
            patient = pk
            drug_name = form.cleaned_data['drug_name']
            dosage = form.cleaned_data['dosage']
            route = form.cleaned_data['route']
            frequency = form.cleaned_data['frequency']
            amount_dispensed = form.cleaned_data['amount_dispensed']
            no_of_refills = form.cleaned_data['no_of_refills']
            expiration_date = form.cleaned_data['expiration_date']
            active = True

            url = "http://localhost:8000/api/prescription-view/"
            payload = {
                "patient" : patient,
                "drug_name" : drug_name,
                "dosage" : dosage,
                "route" : route,
                "frequency" : frequency,
                "amount_dispensed" : amount_dispensed,
                "no_of_refills" : no_of_refills,
                "expiration_date" : expiration_date,
                "active" : active
            }
            response = requests.post(url, data=payload)
            if response.status_code == 200 or response.status_code == 201:
                messages.success(request, "Successfully added a general answer!")
                return redirect("prescriptions:prescription_list_view" , pk)
            else:
                messages.error(request, "Invalid input! Please check.")
        else:
            print("Error in POst")
            form = PrescriptionForms()
    context = {
        'form' : form,
        'id' : pk        
    }

    return render(request, template_name, context)


def prescription_active(request, pk, pk2):

    try:
        url =f"http://localhost:8000/api/prescription-detail-update-delete/{pk2}/"
        payload = {
            "active": False,
        }
        response =  requests.put(url, data=payload)
    except:
        print("error")

    return redirect("prescriptions:prescription_list_view" , pk)

def prescription_delete(request, pk, pk2):

    try:
        url =f"http://localhost:8000/api/prescription-detail-update-delete/{pk2}/"
        response =  requests.delete(url)
    except:
        print("error")

    return redirect("prescriptions:prescription_list_view" , pk)