import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  rFirstName = '';
  rLastName = '';
  rNric = '';
  rAddress ='';
  rContactNo = '';
  rEmail = '';

  receptionists:Array<any>;
  doctors:Array<any>;
  receptionist:any;
  doctor:any;
  constructor(
    private managerService: ManagerService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getClinicTeam();
  }

  getClinicTeam(){
    this.managerService.getClinicTeam().subscribe(
      res=>{
        this.receptionists = res['receptionists'];
        this.doctors = res['doctors'];
    })
  }

  viewReceptionistInfo(receptionist){
    this.receptionist = receptionist;
  }

  viewDoctorInfo(doctor){
    this.doctor = doctor
  }

  onAddReceptionist(){
    let receptionist = {
      "firstName": this.rFirstName,
      "lastName": this.rLastName,
      "email": this.rEmail,
      "nric": this.rNric,
      "address": this.rAddress,
      "contactNo": this.rContactNo
    }
    if(!this.validateService.validateRegistration(receptionist)){
      this.flashMessagesService.show('Please fill all the fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(receptionist.email)){
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateContactNo(receptionist.contactNo)) {
      this.flashMessagesService.show('Please enter a valid contact number', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateNric(receptionist.nric)){
      this.flashMessagesService.show('Please enter a valid nric', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.managerService.registerReceptionist(receptionist).subscribe(
      res=> {
        this.flashMessagesService.show('You have successfully registered the clinic', { cssClass: 'alert-success', timeout: 3000});
        this.getClinicTeam(); 
      },
      err => {
        this.flashMessagesService.show('Something happened!', { cssClass: 'alert-success', timeout: 3000});
    })
  }
}
