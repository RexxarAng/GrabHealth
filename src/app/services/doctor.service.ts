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

  getWalkInPatients() {
    return this.http.get(this.url + '/doctor/walkin-patientlist');
  }

  editWalkInPatientInfo(walkinpatient) {
    return this.http.post(this.url + '/doctor/editWalkInPatientInfo', walkinpatient);
  }

  getPatients() {
    return this.http.get(this.url + '/doctor/patient-list');
  }

  editPatientInfo(patient) {
    return this.http.post(this.url + '/doctor/editPatientInfo', patient);

  }

  getCurrentPatient() {
    return this.http.get(this.url + '/doctor/current-patient');
  }


  
}