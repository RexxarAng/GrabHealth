import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ManagerService {

  // private url = "/routes/comment";
  constructor(private http: HttpClient) {
    console.log('Comment Service Initialized...');
  }

  
  

}