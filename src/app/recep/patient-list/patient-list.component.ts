import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {
  patient:any;

  constructor() {

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

patientlist = [ {
  first_name: "Jake",
  last_name: "Peralta",
  nric: "S1234567A",
  gender: "Male",
  address: "Blk 123 Happy Street #06-132 S(321123)",
  dob: "01/04/1997",
  nationality: "Singaporean",
  contact: "91234567"

}, {
  first_name: "Amy",
  last_name: "Santiago",
  nric: "S9812345J",
  gender: "Female",
  address: "Blk 124 Waterfall Street #02-100 S(321124)",
  dob: "04/01/1998",
  nationality: "Singaporean",
  contact: "98765432"

}]

  ngOnInit() {}

  viewPatientInfo(patient){
    this.patient = patient;
  }


}
