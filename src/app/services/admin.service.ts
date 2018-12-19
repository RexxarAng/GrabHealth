import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AdminService {

  // private url = "/routes/comment";
  constructor(private http: HttpClient) {
    console.log('Comment Service Initialized...');
  }

  registerClinic(manager, clinic) {
    const clinicDetails = {
        manager: manager,
        clinic: clinic
    };
    const headers = new HttpHeaders()
        .set("Content-Type", "application/json");
    return this.http.post('http://localhost:4560/admin/clinic/register', clinicDetails, {headers: headers});                     
}
  

}