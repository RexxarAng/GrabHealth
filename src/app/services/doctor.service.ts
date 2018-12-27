import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class DoctorService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
    }


}