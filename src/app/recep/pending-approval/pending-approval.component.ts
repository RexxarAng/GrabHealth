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
  sessionSlot: '';


  constructor(
    private receptionistService: ReceptionistService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPendingList();
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
        this.pendingList = res['pendingList'];
      },
      err=>{
      
      }
    )
  }

  // Approve Appointment
  onApproveAppointment(){

  }


  // Reject Appointment
  onRejectAppointment(){

  }

}
