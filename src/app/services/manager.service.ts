import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ManagerService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
    }

    registerReceptionist(receptionist) {
        return this.http.post('http://localhost:4560/manager/register/receptionist', receptionist);                     
    }
  
    registerDoctor(doctor) {
        return this.http.post('http://localhost:4560/manager/register/doctor', doctor);                     
    }

    getClinicTeam(){
        return this.http.get('http://localhost:4560/manager/clinic/team');
    }


}