from rest_framework import serializers

from .models import Prescription, PatientInformation

class PatientInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInformation
        fields = ('id', 'l_name', 'f_name', 'age', 'bday', 'contact', 'email')

class PrescriptionSerializerView(serializers.ModelSerializer):
    # patient = PatientInformationSerializer()
    class Meta:
        model = Prescription
        fields = ['drug_name' , 'dosage' , 'route', 'frequency', 'amount_dispensed', 'no_of_refills', 'expiration_date','date_created', 'active']


class PrescriptionSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['drug_name' , 'dosage' , 'route', 'frequency', 'amount_dispensed', 'no_of_refills', 'expiration_date', 'active']


#######    SERIALIZER FOR DETAIL VIEW OF ALL PRESCRIPTION PER PATIENT ##########
class PatientDetailSerializer(serializers.ModelSerializer):
    patient_prescription = PrescriptionSerializerView(many=True, read_only=True)
    class Meta:
        model = PatientInformation
        fields = ('id', 'l_name', 'f_name', 'age', 'bday', 'contact', 'email', 'patient_prescription')