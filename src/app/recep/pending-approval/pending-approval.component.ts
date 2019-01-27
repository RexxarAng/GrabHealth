import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../services/receptionist.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.css']
})
export class PendingApprovalComponent implements OnInit {
  patient: any;
  pendingList: Array<any>;
  firstName: '';
  lastName: '';
  address: '';
  contactNo: '';
  nric: '';
  dob: '';
  nationality: '';
  gender: '';
  email: '';
  remarks: '';
  sessionSlot: '';
  pendingApprovalPolling: any;

  nricSearch: any;

  constructor(
    private receptionistService: ReceptionistService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPendingList();
    this.pendingApprovalPolling = setInterval(() =>
      this.getPendingList(),3000);
  }

  ngOnDestroy() {
    clearInterval(this.pendingApprovalPolling);
  }


  // View patient info
  viewPatientInfo(patient) {
    this.patient = patient;
  }


  // Display patients
  getPendingList(){
    this.receptionistService.getPendingList().subscribe(
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
        this.pendingList = res['pendingList']['patients'];
      },
      err=>{
      
      }
    )
  }

  // Handle Appointment Btn
  handleAppointment(patient){
    this.patient = patient;
  }


  // Approve Appointment
  onApproveAppointment(patient){
    this.patient = patient;
    this.patient.remarks = this.remarks;
    this.receptionistService.onApproveAppointment(patient).subscribe(
      res=>{
        if(res['success']){
          console.log(res);
          this.getPendingList();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
          console.log(res);
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
          this.getPendingList();
        }
      },
      err => {
        this.flashMessagesService.show('Somewhere broke while attempting to approve request!', { cssClass: 'alert-danger', timeout: 3000});
      }
    )    
  }


  // Reject Appointment
  onRejectAppointment(patient){
    this.patient = patient;
    this.patient.remarks = this.remarks;

    this.receptionistService.onRejectAppointment(patient).subscribe(
      res=>{
        if(res['success']){
          console.log(res);
          this.getPendingList();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
          console.log(res);
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
          this.getPendingList();
        }
      },
      err => {
        this.flashMessagesService.show('Somewhere broke while attempting to approve request!', { cssClass: 'alert-danger', timeout: 3000});
      }
    )    
  }

}
