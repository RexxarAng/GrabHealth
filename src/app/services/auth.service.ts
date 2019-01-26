import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
        private router: Router,
        private flashMessagesService: FlashMessagesService
        ) {}
    url = environment.clinicserverurl;

    noAuthHeader = { headers: new HttpHeaders({"NoAuth": "true"}) };

    //Doctor/Receptionist/Manager login
    loginClinic(credentials, role){
        credentials.role = role;
        return this.http.post(this.url + '/authenticate', credentials, this.noAuthHeader);
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
    unAuthenticated(){
        this.flashMessagesService.show('unauthenticated access', { cssClass: 'alert-danger', timeout: 3000});
        this.logout();
    }

    logout(){
        var userPayload = this.getUserPayload();
        if (userPayload) {
            if (!this.jwtHelper.isTokenExpired(userPayload)){
                return this.http.post(this.url + '/blacklistToken', "Nothing").subscribe(
                    res=>{
                        this.deleteToken();
                        this.router.navigateByUrl('/login');
                    });
            } else {
                this.deleteToken();
                this.router.navigateByUrl('/login');
            }
        } else {
            this.deleteToken();
            return this.router.navigateByUrl('/login');
        }

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
