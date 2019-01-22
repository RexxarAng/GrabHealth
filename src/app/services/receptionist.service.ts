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
        return this.http.get(this.url + '/receptionist/queue-list');
    }  

    onRemoveFromQueue(nric){
      return this.http.post(this.url + '/receptionist/removePatientFromQueue', nric);
    }

    getPendingList(){
      return this.http.get(this.url + '/receptionist/pendingList');
    }
    

}