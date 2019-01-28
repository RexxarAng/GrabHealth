import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { ReceptionistService } from '../../services/receptionist.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';


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
  showMain: Boolean;

  currentDate = Date.now();
  datePolling: any;

  disc: any;
  consultationAmt: any;
  payment: any;
  clinic:any;
  visit: any;
  visits: Array<any>;
  medicineList: Array<any>;
  subtotal: number;
  medicineItem: any;
  gst: number;

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
    this.showMain= true;
    this.datePolling = setInterval(() =>
      this.loadDate(),2000);
    this.getVisits();
    this.subtotal = 0;
    this.gst = 0;
    
  }

  ngOnDestroy(){
    clearInterval(this.datePolling);
  }

  loadDate(){
    this.currentDate = Date.now();
  }

//   visits = [{ 
//     patient:{
//       firstName: "Jake",
//       lastName: "Peralta",
//       nric: "S1234567A",
//       gender: "Male",
//       address: "Blk 123 Happy Street #06-132 S(321123)",
//       dob: "01/04/1997",
//       nationality: "Singaporean",
//       contactNo: "91234567",
//       queueNo: 1
//     },
//     reasonForVisit: "Keng mc",
//     dispenseMedicineList: [{
//       medicine: {
//         name: 'Panadol',
//         category: 'Painkiller',
//         effects: 'Drowsiness',
//         price: 3.90
//       },
//       frequency: '3/day',
//       instructions: 'Use only when in pain',
//       dosage: '300mg'
      
//     }]
// }];

  // Retrieve all visits created by doctor for payment
  getVisits(){
    this.receptionistService.getAllVisits().subscribe(res=>{
      if(res['success']){
        this.visits = res['visits'];
      } else {
        if(res['unauthenticated']){
          this.authService.unAuthenticated();
          return false;
        }
      }
    })
  }


  // View and fill in receipt
  // viewReceipt(visit){
  //   this.showMain = false;
  //   this.visit = visit;
  //   var totalMedicineCost: number; 
  //   for(let medicineItem of visit.medicineList){
  //     console.log(medicineItem);
  //     totalMedicineCost += +medicineItem.price;
  //   }
  //   this.subtotal = totalMedicineCost;
  //   console.log(totalMedicineCost);
  //   this.subtotal += +visit.clinic.consultationFee;
  //   this.gst = 0.07 * this.subtotal;
  // }

  viewReceipt(visit){
    this.visit = visit;
    this.receptionistService.createPayment(this.visit).subscribe(res=>{
      if(res['success']){
        this.getVisits();
        this.payment = res['payment'];
        this.medicineList = res['payment']['visit']['medicineList'];
        this.showMain = false;
        this.flashMessagesService.show('Successful', { cssClass: 'alert-success', timeout: 3000});
      } else {
        if(res['unauthenticated']){
          this.authService.unAuthenticated();
          return false;
        }
        this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});

      }
    });
  }

  closeReceipt(){
    this.showMain = true;
  }

  // Generate Receipt PDF
  downloadPDF(quality = 4) {
    const filename = 'receipt.pdf';
    const date = Date.now();

    html2canvas(document.querySelector('#printToPDF'), {scale: quality}).then(canvas => {
      var imgWidth = 210;   
      var pageHeight = 298;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      
      const contentDataURL = canvas.toDataURL('image/png');

      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(date + filename);
    });
  }
}
