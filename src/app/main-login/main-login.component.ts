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

  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
    
  }

  onDoctorLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (this.password == '') {
      this.flashMessagesService.show('Please enter your password', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    this.authService.login(credentials).subscribe(
      res => {
        console.log(res)
        this.authService.setToken(res['token'])
        this.router.navigateByUrl('/clinic/registration');
      },
      err => {
        this.flashMessagesService.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 3000 });
        console.log(err);
      }
    );
  }

  // public clinicManager: boolean = false;
  // public receptionist: boolean = false;
  // public doctor: boolean = false;
  // public clinicManagerButton: any = 'Show';
  // public receptionistButton: any = 'Show';
  // public doctorButton: any = 'Show';

 
  // onClinicManager() {
  //   this.clinicManager = !this.clinicManager;
  //   console.log ("True or false : " +this.clinicManager);
  //   console.log("True or false : " + this.receptionist);
  //   console.log ("True or false : " +this.doctor);
  //   // CHANGE THE NAME OF THE BUTTON.
  //   if(this.clinicManager){
  //     this.clinicManagerButton = "Hide";
      
  //   }  
  //   else{
  //     this.clinicManagerButton = "Show";
  //     // if (this.receptionist == true)
  //     //   this.buttonName = "Hide";
  //     // if (this.doctor == true)
  //     //   this.buttonName = "Hide";
  //   }
  // }
  

  // onReceptionist() {
  //   this.receptionist = !this.receptionist;
  //   console.log("True or false : " + this.clinicManager);
  //   console.log("True or false : " + this.receptionist);
  //   console.log("True or false : " + this.doctor);
  //   // CHANGE THE NAME OF THE BUTTON.
  //   if (this.receptionist){
  //     console.log (this.receptionist);
  //     this.receptionistButton = "Hide";
  //   }
  //   else{
  //     console.log(this.receptionist);
  //     this.receptionistButton = "Show";
      

  //     // if (this.clinicManager == true)
  //     //   this.buttonName = "Hide";
  //     // if (!this.doctor == true)
  //     //   this.buttonName = "Hide";
  //   }
  // }

  // onDoctor() {
  //   this.doctor = !this.doctor;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   if (this.doctor)
  //     this.doctorButton = "Hide";
  //     // if (this.receptionist == true)
  //     //   this.buttonName = "Hide";
  //     // if (!this.clinicManager == true)
  //     //   this.buttonName = "Hide";
  //   else
  //     this.doctorButton = "Show";
  //     // if (this.receptionist == true)
  //     //   this.buttonName = "Hide";
  //     // if (!this.clinicManager == true)
  //     //   this.buttonName = "Hide";
  // }

}
