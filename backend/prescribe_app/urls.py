from django.urls import path

from .views import(
    prescription_view,
    prescriptionCreate,
    prescription_update_or_delete,
    

    patients_view,
    patient_info_detail,
)

urlpatterns = [
    path('prescription-view/', prescription_view, name = 'prescription_view'),
    path('prescription-create/', prescriptionCreate, name = 'prescriptionCreate'),
    path('prescription-detail-update-delete/<int:pk>/', prescription_update_or_delete, name = 'prescription_delete'),

    path('patients-info-view/', patients_view, name = 'prescription_view'),
    path('patient-info-detail/<int:pk>/', patient_info_detail, name = 'prescription_update_or_delete'),
]
