import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ReceptionistService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
    }

    createPatient(patient){
      return this.http.post('http://localhost:4560/receptionist/createPatient', patient);
    }

    getPatients(){
      return this.http.get('http://localhost:4560/receptionist/patient-list');
    }

    editPatientInfo(patient){
      return this.http.post('http://localhost:4560/receptionist/editPatientInfo', patient);
    }

    onAddToQueue(patient){
      return this.http.post('http://localhost:4560/receptionist/addPatientToQueue', patient);
    }

    getQueue(){
        return this.http.get('http://localhost:4560/receptionist/queue-list');
    }  

    onRemoveFromQueue(nric){
      return this.http.post('http://localhost:4560/receptionist/', nric);
    }

    viewPatientInfo(patient){
      return this.http.post('http://localhost:4560/receptionist/viewPendingApproval', patient);
    }
}