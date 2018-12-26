import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ReceptionistService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
    }


}