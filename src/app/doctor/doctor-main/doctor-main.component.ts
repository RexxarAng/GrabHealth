import { Component, OnInit, Input } from '@angular/core';
import { PatientListComponent } from 'src/app/recep/patient-list/patient-list.component';

@Component({
  selector: 'app-doctor-main',
  templateUrl: './doctor-main.component.html',
  styleUrls: ['./doctor-main.component.css']
})
export class DoctorMainComponent implements OnInit {

  @Input() PatientListComponent: PatientListComponent; 
  constructor() {

    
   }

  ngOnInit() {
  }

}
