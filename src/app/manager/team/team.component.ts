import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  rFirstName = '';
  rLastName = '';
  rNric = '';
  rAddress ='';
  rContactNo = '';
  rEmail = '';

  dFirstName = '';
  dLastName = '';
  dNric = '';
  dAddress ='';
  dContactNo = '';
  dEmail = '';
  dDoctorLicenseNo = '';

  receptionists:Array<any>;
  doctors:Array<any>;
  receptionist:any;
  doctor:any;
  constructor(
    private managerService: ManagerService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getClinicTeam();
  }

  getClinicTeam(){
    this.managerService.getClinicTeam().subscribe(
      res=>{
        this.receptionists = res['receptionists'];
        this.doctors = res['doctors'];
    })
  }

  viewReceptionistInfo(receptionist){
    this.receptionist = receptionist;
  }

  viewDoctorInfo(doctor){
    this.doctor = doctor
  }

  onAddReceptionist(){
    let receptionist = {
      "firstName": this.rFirstName,
      "lastName": this.rLastName,
      "email": this.rEmail,
      "nric": this.rNric,
      "address": this.rAddress,
      "contactNo": this.rContactNo
    }
    if(!this.validateService.validateRegistration(receptionist)){
      this.flashMessagesService.show('Please fill all the fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(receptionist.email)){
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateContactNo(receptionist.contactNo)) {
      this.flashMessagesService.show('Please enter a valid contact number', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateNric(receptionist.nric)){
      this.flashMessagesService.show('Please enter a valid nric', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.managerService.registerReceptionist(receptionist).subscribe(
      res=> {
        if(res['success']) {
          this.flashMessagesService.show('You have successfully registered the receptionist', { cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessagesService.show("Receptionist is already registered", { cssClass: 'alert-danger', timeout: 3000});
        }
        this.getClinicTeam(); 
      },
      err => {
        this.flashMessagesService.show('Something happened!', { cssClass: 'alert-success', timeout: 3000});
    })
  }

  onAddDoctor(){
    let doctor = {
      "firstName": this.dFirstName,
      "lastName": this.dLastName,
      "email": this.dEmail,
      "nric": this.dNric,
      "address": this.dAddress,
      "contactNo": this.dContactNo,
      "doctorLicenseNo": this.dDoctorLicenseNo
    }
    if(!this.validateService.validateRegistration(doctor)){
      this.flashMessagesService.show('Please fill all the fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(doctor.email)){
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateContactNo(doctor.contactNo)) {
      this.flashMessagesService.show('Please enter a valid contact number', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateNric(doctor.nric)){
      this.flashMessagesService.show('Please enter a valid nric', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.managerService.registerDoctor(doctor).subscribe(
      res=> {
        if(res['success']) {
          this.flashMessagesService.show('You have successfully registered the doctor', { cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessagesService.show("Doctor is already registered", { cssClass: 'alert-danger', timeout: 3000});
        }
        this.getClinicTeam(); 
      },
      err => {
        this.flashMessagesService.show('Something happened!', { cssClass: 'alert-success', timeout: 3000});
    })
  }
}
