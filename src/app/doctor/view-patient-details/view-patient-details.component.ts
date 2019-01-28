import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-patient-details',
  templateUrl: './view-patient-details.component.html',
  styleUrls: ['./view-patient-details.component.css']
})
export class ViewPatientDetailsComponent implements OnInit {

  patient: any;
  patientlist: Array<any>;
  firstName: '';
  lastName: '';
  nric: '';
  dob: '';
  email: '';
  gender: '';
  
  editPFirstName: '';
  editPLastName: '';
  editPAddress: '';
  editPDOB: '';
  editPNationality: '';
  editPContactNo: '';

  
  //walk in patient
  walkinpatient: any;
  walkinpatientlist: Array<any>;
  editWFirstName: '';
  editWLastName: '';
  editWAddress: '';
  editWDOB: '';
  editWNationality: '';
  editWContactNo: '';
  WfirstName: '';
  WlastName: '';
  Wnric: '';
  Wdob: '';
  Wemail: '';
  Wgender: '';
  patientSearch: any;

  constructor(
    private DoctorService: DoctorService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private validateService: ValidateService,
  ) { }

  ngOnInit() {
    this.getPatients();
    this.getWalkInPatients();
  }

  viewPatientInfo(patient) {
    this.patient = patient;
  }



  editPatientInfo(patient) {
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

  onEditPatientInfo() {
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

    this.DoctorService.editPatientInfo(patient).subscribe(
      res => {
        if (res['success']) {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000 });
          this.getPatients();
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000 });
          this.getPatients();
        }
      },
      err => {
        this.flashMessagesService.show('Somewhere broke while attempting to save edited patient details!', { cssClass: 'alert-danger', timeout: 3000 });
      }
    );
  }
 
   getPatients() {
    this.DoctorService.getPatients().subscribe(
      res => {
        console.log(res);
        if (!res['success']) {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000 });
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
        }
        this.patientlist = res['patients'];
      },
      err => {

      }
    )
  }

  editWalkInPatientInfo(walkinpatient) {
    this.walkinpatient = walkinpatient;
    this.editWFirstName = walkinpatient.firstName;
    this.editWLastName = walkinpatient.lastName;
    this.nric = walkinpatient.nric;
    this.gender = walkinpatient.gender;
    this.editWAddress = walkinpatient.address;
    this.dob = walkinpatient.dob;
    this.editWNationality = walkinpatient.nationality;
    this.editWContactNo = walkinpatient.contactNo;
    this.email = walkinpatient.email;
  }

  onEditWalkInPatientInfo() {
    let walkinpatient = {
      firstName: this.editWFirstName,
      lastName: this.editWLastName,
      nric: this.nric,
      gender: this.gender,
      address: this.editWAddress,
      dob: this.dob,
      nationality: this.editWNationality,
      contactNo: this.editWContactNo,
      email: this.email
    }

    this.DoctorService.editWalkInPatientInfo(walkinpatient).subscribe(
      res => {
        if (res['success']) {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000 });
          this.getWalkInPatients();
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000 });
          this.getWalkInPatients();
        }
      },
      err => {
        this.flashMessagesService.show('Somewhere broke while attempting to save edited patient details!', { cssClass: 'alert-danger', timeout: 3000 });
      }
    );
  }



  getWalkInPatients() {
    this.DoctorService.getWalkInPatients().subscribe(
      res => {
        console.log(res);
        if (!res['success']) {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000 });
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
        }
        this.walkinpatientlist = res['patients'];
      },
      err => {

      }
    )
  }

  }

