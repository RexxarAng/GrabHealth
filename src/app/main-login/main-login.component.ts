import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../services/validate.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {
  myRecaptcha: boolean;
  login: string;
  mEmail: '';
  mPassword: '';
  rEmail: '';
  rPassword: '';
  dEmail: '';
  dPassword: '';
  aEmail: '';
  aPassword: '';
  managerLogin: Boolean;
  doctorLogin: Boolean;
  receptionistLogin: Boolean;
  resetREmail: '';
  resetRNric: '';
  resetMEmail: '';
  resetMNric: '';
  resetDEmail: '';
  resetDNric: '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.managerLogin = false;
    this.doctorLogin = false;
    this.receptionistLogin = false;
   }

  onManager(){
    this.login = "Manager";
    this.managerLogin = true;
    this.doctorLogin = false;
    this.receptionistLogin = false;
  }
  onDoctor(){
    this.login = "Doctor";
    this.managerLogin = false;
    this.doctorLogin = true;
    this.receptionistLogin = false;
  }
  onReceptionist(){
    this.login = "Receptionist";
    this.managerLogin = false;
    this.doctorLogin = false;
    this.receptionistLogin = true;
  }

  onDoctorLogin() {
    const credentials = {
      email: this.dEmail,
      password: this.dPassword
    };

    if (!this.validateService.validateEmail(credentials.email)) {
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (credentials.password == '') {
      this.flashMessagesService.show('Please enter your password', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.loginClinic(credentials, 'Doctor').subscribe(
      res => {
        if(res['success']){
          var user = res['user'];
          this.authService.setToken(res['token'], user.role);
          this.router.navigateByUrl('/doctor/doctor-main');
        } else {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        } 
      },
      err => {
        this.flashMessagesService.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 3000 });
        console.log(err);
      }
    );
  }

  onReceptionistLogin() {
    const credentials = {
      email: this.rEmail,
      password: this.rPassword
    };

    if (!this.validateService.validateEmail(credentials.email)) {
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (credentials.password == '') {
      this.flashMessagesService.show('Please enter your password', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.loginClinic(credentials, 'Receptionist').subscribe(
      res => {
        if(res['success']){
          var user = res['user'];
          this.authService.setToken(res['token'], user.role);
          this.router.navigateByUrl('/receptionist/patient-list');
        } else {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        } 
      },
      err => {
        this.flashMessagesService.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 3000 });
        console.log(err);
      }
    );
  }

  onClinicManagerLogin() {
    const credentials = {
      email: this.mEmail,
      password: this.mPassword
    };

    if (!this.validateService.validateEmail(credentials.email)) {
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (credentials.password == '') {
      this.flashMessagesService.show('Please enter your password', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.loginClinic(credentials, 'Manager').subscribe(
      res => {
        if(res['success']){
          var user = res['user'];
          this.authService.setToken(res['token'], user.role);
          this.router.navigateByUrl('/manager/clinic-team');
        } else {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        } 
      },
      err => {
        this.flashMessagesService.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 3000 });
        console.log(err);
      }
    );
  }

  onResetPw(role){
    const credentials = {
      role: role,
      nric: '',
      email: ''
    };
    if(role === 'Doctor') {
      credentials.nric = this.resetDNric,
      credentials.email = this.resetDEmail
    } else if(role === 'Manager'){
      credentials.nric = this.resetMNric,
      credentials.email = this.resetMEmail
    } else if(role === 'Receptionist'){
      credentials.nric = this.resetRNric,
      credentials.email = this.resetREmail
    }

    if (!this.validateService.validateEmail(credentials.email) ) {
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if(!this.validateService.validateNric(credentials.nric)){
      this.flashMessagesService.show('Please enter a valid nric', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.authService.resetPassword(credentials).subscribe(res=>{
      if(res['success']){
        this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        this.router.navigateByUrl('/login');
      } else {
        this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
      } 
    })


  }

  // onScriptLoad() {
  //   console.log('Google reCAPTCHA loaded and is ready for use!')
  // }

  // onScriptError() {
  //   console.log('Something went long when loading the Google reCAPTCHA')
  // }
}
//     this.authService.loginAdmin(credentials).subscribe(
//       res => {
//         if(res['success']){
//           var user = res['user'];
//           this.authService.setToken(res['token'], user.role);
//           this.router.navigateByUrl('/clinic/registration');
//         } else {
//           this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
//         } 
//       },
//       err => {
//         this.flashMessagesService.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 3000 });
//         console.log(err);
//       }
//     );
//   }
// }
