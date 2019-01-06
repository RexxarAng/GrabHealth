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
  }

  addPatientToQueue(patient){
    this.patient = patient;
    $("#addToQueueSuccessAlert").hide().show('medium');
  }
  
  getPatients(){
    this.receptionistService.getPatients().subscribe(
      res=>{
        if(!['success']){
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 5000});
        }
        this.patientlist = res['patients'];
      },
      err=>{
      
      }
    )
  }
  
  createPatient(){
    let patient = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      nric: this.nric,
      contactNo: this.contactNo,
      nationality: this.nationality,
      dob: this.dob,
      gender: this.gender
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

    if (this.address === '' || this.address === 0){
      this.flashMessagesService.show('Please enter address!', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }



    this.receptionistService.createPatient(patient).subscribe(
      res=>{
        if(res['success']){
          this.getPatients();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 5000});
                  
        } else {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 5000});
        }
        // if(res['unauthenticated']){
        //   this.authService.logout();
        // }
      },
      err => {

      }
    )    

  }


}
