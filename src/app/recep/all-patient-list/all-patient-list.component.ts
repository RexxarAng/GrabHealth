import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { ReceptionistService } from '../../services/receptionist.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-all-patient-list',
  templateUrl: './all-patient-list.component.html',
  styleUrls: ['./all-patient-list.component.css']
})
export class AllPatientListComponent implements OnInit {
  patient: any;
  patientlist: Array<any>;
  patientRecords: Array<any>;
  firstName: '';
  lastName: '';
  address: '';
  contactNo: '';
  nric: '';
  dob: '';
  nationality: '';
  gender: '';
  email: '';

  editPFirstName: '';
  editPLastName: '';
  editPAddress: '';
  editPNationality: '';
  editPContactNo: '';

  searchNric: any;
  allPatientListPolling: any;

  constructor(
    private receptionistService: ReceptionistService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService,
  ) { 
    $(function(){
      var dtToday = new Date();
      
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if(this.month < 10)
          this.month = '0' + month.toString();
      if(this.day < 10)
          this.day = '0' + day.toString();
      
      var maxDate = year + '-' + month + '-' + day;
      $('#DOBId').attr('max', maxDate);
    });
  }

  ngOnInit() {
    //this.getAllRecords();
    this.getPatients();
    this.getAllRecords();
    
    this.allPatientListPolling = setInterval(() =>
      this.getAllRecords(),3000);
  }

  ngOnDestroy() {
    clearInterval(this.allPatientListPolling);
  }

  viewPatientInfo(patient){
    this.patient = patient;
  }

  editPatientInfo(patient){
    this.patient = patient;
    this.editPFirstName = patient.firstName;
    this.editPLastName = patient.lastName;
    this.nric = patient.nric;
    this.gender = patient.gender;
    this.editPAddress = patient.address;
    this.dob = patient.dob;
    this.editPNationality = patient.nationality;
    this.editPContactNo = patient.contactNo;
    this.email = patient.email;
  }

  onEditPatientInfo(){
    let patient = {
      firstName: this.editPFirstName,
      lastName: this.editPLastName,
      nric: this.nric,
      gender: this.gender,
      address: this.editPAddress,
      dob: this.dob,
      nationality: this.editPNationality,
      contactNo: this.editPContactNo,
      email: this.email
    }

    // Required fields
    if(!this.validateService.validatePatientRegistration(patient)) {
      this.flashMessagesService.show('Please enter all fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate First Name
    if(!this.validateService.validateFirstName(patient.firstName)){
      this.flashMessagesService.show('Please enter valid first name!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Last Name
    if(!this.validateService.validateLastName(patient.lastName)){
      this.flashMessagesService.show('Please enter valid last name!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Address
    if(!this.validateService.validateAddress(patient.address)){
      this.flashMessagesService.show('Please enter valid address!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate nationality
    if(!this.validateService.validateNationality(patient.nationality)){
      this.flashMessagesService.show('Please enter valid nationality!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate contact
    if(!this.validateService.validateContactNo(patient.contactNo)) {
      this.flashMessagesService.show('Please enter valid contact no.!', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }


    this.receptionistService.editPatientInfo(patient).subscribe(
      res=>{
        if(res['success']){
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
          this.getPatients();
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
          this.getPatients();
        }
      },
      err => {
        this.flashMessagesService.show('Somewhere broke while attempting to save edited patient details!', { cssClass: 'alert-danger', timeout: 3000});
      }
    );
  }


  // Display patients
  getPatients(){
    this.receptionistService.getPatients().subscribe(
      res=>{
        console.log(res);
        if(!res['success']){
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
        }       
        this.patientlist = res['patients'];
      },
      err=>{
      
      }
    )
  }


  // Display patients in clinic
  getAllRecords(){
    this.receptionistService.getAllRecords().subscribe(
      res=>{
        console.log(res);
        if(!res['success']){
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
        }       
        this.patientRecords = res['patientRecords'];
      },
      err=>{
      
      }
    )
  }
  

}
