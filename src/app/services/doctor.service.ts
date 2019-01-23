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

  addReasonForVisit(reasonForVisit) {
    return this.http.post(this.url + '/doctor/add/reasonForVisit', reasonForVisit);
  }

  getReasonForVisit() {
    return this.http.get(this.url + '/doctor/reasonForVisit');
  }

  addMedicine(selectedMedicine) {
    return this.http.post(this.url + '/doctor/add/medicine', selectedMedicine);
  }

  getMedicine() {
    return this.http.get(this.url + '/doctor/medicine');
  }
  
}