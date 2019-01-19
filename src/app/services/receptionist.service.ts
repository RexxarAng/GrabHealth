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

    addPatientToQueue(patient){
      return this.http.post('http://localhost:4560/receptionist/addPatientToQueue', patient);
    }

}