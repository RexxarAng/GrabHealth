import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
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

  eRFirstName = '';
  eRLastName = '';
  eRAddress = '';
  eRContactNo = '';

  dFirstName = '';
  dLastName = '';
  dNric = '';
  dAddress ='';
  dContactNo = '';
  dEmail = '';
  dDoctorLicenseNo = '';

  eDFirstName = '';
  eDLastName = '';
  eDAddress = '';
  eDContactNo = '';

  receptionists:Array<any>;
  doctors:Array<any>;
  receptionist:any;
  doctor:any;
  constructor(
    private managerService: ManagerService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getClinicTeam();
  }

  getClinicTeam(){
    this.managerService.getClinicTeam().subscribe(
      res=>{
        if(res['success']){
          this.receptionists = res['receptionists'];
          this.doctors = res['doctors'];
        } else {
          if(!res['authenticated']){
            this.authService.unAuthenticated(res['msg']);
            return false;
          }
        }
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
          if(!res['authenticated']){
            this.authService.unAuthenticated(res['msg']);
            return false;
          }
          this.flashMessagesService.show("Receptionist is already registered", { cssClass: 'alert-danger', timeout: 3000});
        }
        this.getClinicTeam(); 
      },
      err => {
        this.flashMessagesService.show('Something happened!', { cssClass: 'alert-danger', timeout: 3000});
    })
  }

  editReceptionistInfo(receptionist){
    this.receptionist = receptionist;
    this.eRFirstName = receptionist.firstName;
    this.eRLastName = receptionist.lastName;
    this.eRAddress = receptionist.address;
    this.eRContactNo = receptionist.contactNo;
  }
  
  onEditReceptionist(){
    let receptionist = {
      firstName: this.eRFirstName,
      lastName: this.eRLastName,
      address: this.eRAddress,
      contactNo: this.eRContactNo,
      nric: this.receptionist.nric
    }

    if(!this.validateService.validateContactNo(receptionist.contactNo)) {
      this.flashMessagesService.show('Please enter a valid contact number', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.managerService.editReceptionist(receptionist).subscribe(
      res=>{
        if(res['success']){
          this.getClinicTeam();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(!res['authenticated']){
            this.authService.unAuthenticated(res['msg']);
            return false;
          }
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        }
      },
      err=>{
        this.flashMessagesService.show('Something happened!', { cssClass: 'alert-danger', timeout: 3000});
      }
    );
  }

  deleteReceptionistInfo(receptionist){
    this.receptionist = receptionist;
  }

  onRemoveReceptionist(){
    let nric = {
      nric: this.receptionist.nric
    }
    this.managerService.removeReceptionist(nric).subscribe(
      res => {
        if(res['success']){
          this.getClinicTeam();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(!res['authenticated']){
            this.authService.unAuthenticated(res['msg']);
            return false;
          }
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        }
      },
      err => {
        this.flashMessagesService.show('Something happened', { cssClass: 'alert-danger', timeout: 3000});
      }
    )
  }

  editDoctorInfo(doctor){
    this.doctor = doctor;
    this.eDFirstName = doctor.firstName;
    this.eDLastName = doctor.lastName;
    this.eDAddress = doctor.address;
    this.eDContactNo = doctor.contactNo;
  }

  onEditDoctor(){
    let doctor = {
      firstName: this.eDFirstName,
      lastName: this.eDLastName,
      address: this.eDAddress,
      contactNo: this.eDContactNo,
      nric: this.doctor.nric
    }

    if(!this.validateService.validateContactNo(doctor.contactNo)) {
      this.flashMessagesService.show('Please enter a valid contact number', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.managerService.editDoctor(doctor).subscribe(
      res=>{
        if(res['success']){
          this.getClinicTeam();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(!res['authenticated']){
            this.authService.unAuthenticated(res['msg']);
            return false;
          }
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        }
      },
      err=>{
        this.flashMessagesService.show('Something happened!', { cssClass: 'alert-danger', timeout: 3000});
      }
    );
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
