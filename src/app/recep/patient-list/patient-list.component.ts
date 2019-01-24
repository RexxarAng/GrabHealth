import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { ReceptionistService } from '../../services/receptionist.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {
  patient: any;
  patientlist: Array<any>;
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
  editPDOB: '';
  editPNationality: '';
  editPContactNo: '';

  searchNric: any;

  queuelist: Array<any>;

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

// patientlist = [ {
//   first_name: "Jake",
//   last_name: "Peralta",
//   nric: "S1234567A",
//   gender: "Male",
//   address: "Blk 123 Happy Street #06-132 S(321123)",
//   dob: "01/04/1997",
//   nationality: "Singaporean",
//   contact: "91234567",

// }, {
//   first_name: "Amy",
//   last_name: "Santiago",
//   nric: "S9812345J",
//   gender: "Female",
//   address: "Blk 124 Waterfall Street #02-100 S(321124)",
//   dob: "04/01/1998",
//   nationality: "Singaporean",
//   contact: "98765432"

// }]

  ngOnInit() {
    this.getPatients();
  }

  viewPatientInfo(patient){
    this.patient = patient;
  }

  editPatientInfo(patient){
    this.patient = patient;
    this.editPFirstName = patient.patient.firstName;
    this.editPLastName = patient.patient.lastName;
    this.nric = patient.patient.nric;
    this.gender = patient.patient.gender;
    this.editPAddress = patient.patient.address;
    this.dob = patient.patient.dob;
    this.editPNationality = patient.patient.nationality;
    this.editPContactNo = patient.patient.contactNo;
    this.email = patient.patient.email;
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
  
  // Create patient
  createPatient(){
    let patient = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      nric: this.nric,
      contactNo: this.contactNo,
      nationality: this.nationality,
      dob: this.dob,
      gender: this.gender,
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

    if (this.firstName === '' || this.firstName === 0){
      this.flashMessagesService.show('Please enter first name!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Last Name
    if(!this.validateService.validateLastName(patient.lastName)){
      this.flashMessagesService.show('Please enter valid last name!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (this.lastName === '' || this.lastName === 0){
      this.flashMessagesService.show('Please enter last name!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Gender
    if(!this.validateService.validateGender(patient.gender)){
      this.flashMessagesService.show('Please select gender!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (this.gender === '' || this.gender === 0){
      this.flashMessagesService.show('Please select gender!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Address
    if(!this.validateService.validateAddress(patient.address)){
      this.flashMessagesService.show('Please enter valid address!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (this.address === '' || this.address === 0 || this.address >256){
      this.flashMessagesService.show('Please enter address!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate DOB
    if(!this.validateService.validateDOB(patient.dob)){
      this.flashMessagesService.show('Please enter valid date of birth!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate nationality
    if(!this.validateService.validateNationality(patient.nationality)){
      this.flashMessagesService.show('Please select nationality!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (this.nationality === '' || this.nationality === 0){
      this.flashMessagesService.show('Please select nationality!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate contact
    if(!this.validateService.validateContactNo(patient.contactNo)) {
      this.flashMessagesService.show('Please enter valid contact no.!', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate email
    if(!this.validateService.validateEmail(patient.email)) {
      this.flashMessagesService.show('Please enter valid email!', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }


    this.receptionistService.createPatient(patient).subscribe(
      res=>{
        if(res['success']){
          this.getPatients();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
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
        this.flashMessagesService.show('Somewhere broke!', { cssClass: 'alert-danger', timeout: 3000});
      }
    )    

  }


  // Add patient to queue
  onAddToQueue(patient){
    
    this.patient = patient;

    this.receptionistService.onAddToQueue(patient.patient).subscribe(
      res=>{
        if(res['success']){
          console.log(res);
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
          console.log(res);
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        }
      },
      err => {
        console.log(err);
        this.flashMessagesService.show('Somewhere broke while attempting to add patient to queue!', { cssClass: 'alert-danger', timeout: 3000});
      }
    )    
  }
  


}
