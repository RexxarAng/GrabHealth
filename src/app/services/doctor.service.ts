import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class DoctorService {

  // private url = "/routes/comment";
  constructor(private http: HttpClient) {
    
  }
  url = environment.clinicserverurl;

 getMedicineList(){
        return this.http.get(this.url + '/doctor/medicineList');
    }


  addReasonForVisit(patient) {
    return this.http.get(this.url + '/doctor/reasonForVisit', patient);
  }

  getReasonForVisit() {
    return this.http.get('http://localhost:4560/doctor/reasonForVisit');
  }

}