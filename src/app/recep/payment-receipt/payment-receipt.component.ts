import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
import $ from 'jquery';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})

export class PaymentReceiptComponent implements OnInit {

  currentDate = Date.now();
  datePolling: any;

  disc: any;
  consultationAmt: any;
  payment: any;
  clinic:any;

  constructor() {}

  ngOnInit() {
    this.datePolling = setInterval(() =>
    this.loadDate(),2000);
  }
  
  loadDate(){
    this.currentDate = Date.now();
  }
  
  /*downloadPDF() {
    const doc = new jsPDF();
    doc.text('Same text here', 10, 10);
    doc.save('test.pdf');
  }*/

  /*downloadPDF() {
    var doc = new jsPDF();

    doc.fromHTML($('#printToPDF').get(0), 100, 100, {
      'width': 500
    });
    doc.save('test123.pdf');
  }*/

  downloadPDF(quality = 4) {
    const filename = 'test123.pdf';

    html2canvas(document.querySelector('#printToPDF'), {scale: quality}).then(canvas => {
      var imgWidth = 210;   
      var pageHeight = 298;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      
      const contentDataURL = canvas.toDataURL('image/png');

      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(filename);
    });
  }

}
