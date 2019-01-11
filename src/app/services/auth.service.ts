import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
        private router: Router,
        private flashMessagesService: FlashMessagesService
        ) {}

    noAuthHeader = { headers: new HttpHeaders({"NoAuth": "true"}) };

    //Admin login 
    loginAdmin(credentials, role){
        credentials.role = role;
        return this.http.post('http://localhost:4560/admin/authenticate', credentials, this.noAuthHeader);
    }
    //Doctor/Receptionist/Manager login
    loginClinic(credentials, role){
        credentials.role = role;
        return this.http.post('http://localhost:4560/authenticate', credentials, this.noAuthHeader);
    }
    getUserRole(){
        return sessionStorage.getItem('user');
    }
    getToken(){
        return sessionStorage.getItem('token');
    }
    setToken(token: string, user: string){
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('token', token);
    }
    deleteToken(){
        sessionStorage.clear();
    }
    unAuthenticated(msg){
        this.flashMessagesService.show('unauthenticated access', { cssClass: 'alert-danger', timeout: 3000});
        this.router.navigateByUrl('/login');
        this.deleteToken();
    }

    getUserPayload(){
        var token = sessionStorage.getItem('token');
        if (token){
            return token;
        } else 
            return null;
    }
    loggedIn(){
        var userPayload = this.getUserPayload();
        if (userPayload) {
            if (!this.jwtHelper.isTokenExpired(userPayload))
                return true;
        } else {
            return false;
        }

    }

}
