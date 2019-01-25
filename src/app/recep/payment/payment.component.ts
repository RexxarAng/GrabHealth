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


  visits = [{ 
    patient:{
      firstName: "Jake",
      lastName: "Peralta",
      nric: "S1234567A",
      gender: "Male",
      address: "Blk 123 Happy Street #06-132 S(321123)",
      dob: "01/04/1997",
      nationality: "Singaporean",
      contactNo: "91234567",
      queueNo: 1
    },
    reasonForVisit: "Keng mc",
    dispenseMedicineList: [{
      medicine: {
        name: 'Panadol',
        category: 'Painkiller',
        effects: 'Drowsiness',
        price: 3.90
      },
      frequency: '3/day',
      instructions: 'Use only when in pain',
      dosage: '300mg'
      
    }]
}];

  // View and fill in receipt
  viewReceipt(){

  }


}
