import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { ReceptionistService } from '../../services/receptionist.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  patient: any;
  //patientlist: Array<any>;
  firstName: '';
  lastName: '';
  address: '';
  contactNo: '';
  nric: '';
  dob: '';
  nationality: '';
  gender: '';
  email: '';

  
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
  }


  patientlist = [ {
    first_name: "Jake",
    last_name: "Peralta",
    nric: "S1234567A",
    gender: "Male",
    address: "Blk 123 Happy Street #06-132 S(321123)",
    dob: "01/04/1997",
    nationality: "Singaporean",
    contact: "91234567",

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

  // View and fill in receipt
  viewReceipt(){

  }


}
