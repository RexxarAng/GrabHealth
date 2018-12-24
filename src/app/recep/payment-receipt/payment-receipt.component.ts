import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
