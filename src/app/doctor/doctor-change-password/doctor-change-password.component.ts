import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-doctor-change-password',
  templateUrl: './doctor-change-password.component.html',
  styleUrls: ['./doctor-change-password.component.css']
})
export class DoctorChangePasswordComponent implements OnInit {
  currentPw: any;
  newPw: any;
  confirmNewPw: any;
  constructor(
    private flashMessagesService: FlashMessagesService, 
    private validateService: ValidateService,
    private doctorService: DoctorService,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  changePW(){
    if(!this.validateService.validatePasswordStrength(this.newPw)){
      this.flashMessagesService.show('Please enter password with minimum 8 characters of uppercase, lowercase and digit', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    var match = this.confirmNewPw === this.newPw;
    if(!match){
      this.flashMessagesService.show('Confirm password does not match new password!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    let password = {
      currentPassword: this.currentPw,
      newPassword: this.newPw
    }
    this.doctorService.changePassword(password).subscribe(res=>{
      if(res['success']){
        this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000 });
        this.authService.logout();
      } else {
        if(res['unauthenticated']){
          this.authService.unAuthenticated();
        }
        this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
