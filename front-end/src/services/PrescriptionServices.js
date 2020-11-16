import axios from 'axios';

const PRESCRIPTION_API_BASE_URL =  "http://127.0.0.1:8000/api/prescription-view" ;
const PATIENT_API_BASE_URL =  "http://127.0.0.1:8000/api/patient-info-detail" ;
class PrescriptionService {

    getPrescription(){
        return axios.get(PRESCRIPTION_API_BASE_URL);
    }

    createPrescription(data){
        return axios.post(PRESCRIPTION_API_BASE_URL, data);
    }

    getPatientInfo(id){
        return axios.get(`http://127.0.0.1:8000/api/patient-info-detail/${id}`);
    }

    // deletePrescription(data){
    //     return axios.post(`PRESCRIPTION_API_BASE_URL/${id}`);
    // }

}

export default new PrescriptionService();