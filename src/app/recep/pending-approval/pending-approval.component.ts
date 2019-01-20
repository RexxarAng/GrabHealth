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
  sessionSlot: '';


  constructor(
    private receptionistService: ReceptionistService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPatients();
  }


  // View patient info
  viewPatientInfo() {
    let patient = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      nric: this.nric,
      contactNo: this.contactNo,
      nationality: this.nationality,
      dob: this.dob,
      gender: this.gender,
      email: this.email
    }
    this.patient = patient;

    this.receptionistService.viewPatientInfo(patient).subscribe(
      res=>{
        if(res['success']){
          this.getPatients();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
            return false;
          }
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
          this.getPatients();
        }
      },
      err => {
        this.flashMessagesService.show('Somewhere broke!', { cssClass: 'alert-danger', timeout: 3000});
      }
    )    

  }


  // Display patients
  getPatients(){
    this.receptionistService.getPatients().subscribe(
      res=>{
        console.log(res);
        if(!res['success']){
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
        }        
        this.patientlist = res['patients'];
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
