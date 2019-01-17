import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class DoctorService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
      
    }
 getMedicineList(){
        return this.http.get('http://localhost:4560/doctor/medicineList');
    }


  addReasonForVisit(patient) {
    return this.http.get('http://localhost:4560/doctor/reasonForVisit', patient);
  }
}