import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class ReceptionistService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
    }
    url = environment.clinicserverurl;

    createPatient(patient){
      return this.http.post(this.url + '/receptionist/createPatient', patient);
    }

    getPatients(){
      return this.http.get(this.url + '/receptionist/patient-list');
    }

    editPatientInfo(patient){
      return this.http.post(this.url + '/receptionist/editPatientInfo', patient);
    }

    onAddToQueue(patient){
      return this.http.post(this.url + '/receptionist/addPatientToQueue', patient);
    }

    getQueue(){
        return this.http.get(this.url + '/receptionist/queueList');
    }  

    onRemoveFromQueue(patient){
      return this.http.post(this.url + '/receptionist/removePatientFromQueue', patient);
    }

    getPendingList(){
      return this.http.get(this.url + '/receptionist/pendingList');
    }

    onApproveAppointment(patient){
      return this.http.post(this.url + '/receptionist/acceptAppointmentRequest', patient);
    }

    onRejectAppointment(patient){
      return this.http.post(this.url + '/receptionist/rejectAppointmentRequest', patient);
    }
    
    getAllRecords(){
        return this.http.get(this.url + '/receptionist/all-patient-list');
    }  

    getAllVisits(){
        return this.http.get(this.url + '/receptionist/visits');
    }
    
    createPayment(visit){
      return this.http.post(this.url + '/receptionist/create/payment', visit);
    }

}