import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-manager-change-password',
  templateUrl: './manager-change-password.component.html',
  styleUrls: ['./manager-change-password.component.css']
})
export class ManagerChangePasswordComponent implements OnInit {
  currentPw: any;
  newPw: any;
  confirmNewPw: any;
  constructor(
    private flashMessagesService: FlashMessagesService, 
    private validateService: ValidateService,
    private managerService: ManagerService,
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
    this.managerService.changePassword(password).subscribe(res=>{
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
