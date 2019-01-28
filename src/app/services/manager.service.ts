import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ManagerService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
    }
    url = environment.clinicserverurl;

    changePassword(password){
        return this.http.post(this.url + '/manager/changePassword', password);
    }

    registerReceptionist(receptionist) {
        return this.http.post(this.url + '/manager/register/receptionist', receptionist);                     
    }
  
    registerDoctor(doctor) {
        return this.http.post(this.url + '/manager/register/doctor', doctor);                     
    }

    getClinicTeam(){
        return this.http.get(this.url + '/manager/clinic/team');
    }

    editReceptionist(receptionist) {
        return this.http.post(this.url + '/manager/edit/receptionist', receptionist);
    }

    editDoctor(doctor) {
        return this.http.post(this.url + '/manager/edit/doctor', doctor);
    }

    removeReceptionist(nric) {
        return this.http.post(this.url + '/manager/remove/receptionist', nric);
    }

    removeDoctor(nric) {
        return this.http.post(this.url + '/manager/remove/doctor', nric);

    }

    addMedicine(medicine){
        return this.http.post(this.url + '/manager/add/medicine', medicine);
    }

    removeMedicine(medicine){
        return this.http.post(this.url + '/manager/remove/medicine', medicine);
    }
    getMedicineList(){
        return this.http.get(this.url + '/manager/medicineList');
    }


}