import { Component, OnInit } from '@angular/core';

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
  medicalHistory: '';
  allergies: '';
  medicineName: '';
  frequency: '';
  instructions: '';
  dosage:'';
  use: '';
  mc: '';


  constructor(

  ) { }

  ngOnInit() {
   
  }

}
