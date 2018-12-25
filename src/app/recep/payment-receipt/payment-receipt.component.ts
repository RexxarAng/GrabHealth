import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})

export class PaymentReceiptComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
  
  downloadPDF() {
    const doc = new jsPDF();
    doc.text('Same text here', 10, 10);
    doc.save('test.pdf');
  }

}
