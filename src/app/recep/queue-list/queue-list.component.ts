import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { ReceptionistService } from '../../services/receptionist.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit {

  patient: any;
  patientlist: Array<any>;
  firstName: '';
  lastName: '';
  address: '';
  contactNo: '';
  nric: '';
  dob: '';
  nationality: '';
  gender: '';
  email: '';

  searchNric: any;

  queuelist: Array<any>;

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
    // this.getPatients();
    this.getQueue();
  }

  viewPatientInfo(patient){
    this.patient = patient;
  }

  // Display patients
  getPatients(){
    this.receptionistService.getPatients().subscribe(
      res=>{
        console.log(res);
        if(!res['success']){
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
        }       
        this.patientlist = res['patients'];
      },
      err=>{
      
      }
    )
  }
  

  // Display patients in queue
  getQueue(){
    this.receptionistService.getQueue().subscribe(
      res=>{
        console.log(res);
        if(!res['success']){
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
        }    
        this.queuelist = res['queueList'];
      },
      err=>{
      
      }
    )
  }


  // Remove patient from queue
  onRemoveFromQueue(patient){
    this.patient = patient;

    this.receptionistService.onRemoveFromQueue(patient).subscribe(
      res=>{
        if(res['success']){
          console.log(res);
          this.getQueue();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
          console.log(res);
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
          this.getQueue();
        }
      },
      err => {
        this.flashMessagesService.show('Somewhere broke while attempting to remove patient from queue!', { cssClass: 'alert-danger', timeout: 3000});
      }
    )    

  }
}
