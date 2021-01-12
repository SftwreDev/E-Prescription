from django.urls import path

from prescription.views_functions.prescription import(
    homepage,
    prescription_list_view,
    add_prescription,
    prescription_active,
    prescription_delete
)

from prescription.views_functions.patients import(
    patient_list_view,
    patient_active
)

app_name = 'prescriptions'

urlpatterns = [
    path('', homepage, name = 'homepage'),
    path('prescription-list-view/<int:pk>/', prescription_list_view, name = 'prescription_list_view'),
    path('add-prescription/<pk>/', add_prescription, name = 'add_prescription'),
    path('prescription-active/<pk>/<pk2>/', prescription_active, name = 'prescription_active'),
    path('prescription-delete/<pk>/<pk2>/', prescription_delete, name = 'prescription_delete'),


    path('list-of-patients-information/', patient_list_view, name = 'patient_list_view'),
    path('patient-active/<pk>/', patient_active, name = 'patient_active'),
]
