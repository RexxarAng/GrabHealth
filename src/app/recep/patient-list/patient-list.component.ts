import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  modalshow: boolean;

  constructor() {}

  ngOnInit() {
    this.modalshow = false;
  }

  addNewPatient() {
    this.modalshow = true;
  }
  

}
