import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-next-patient',
  templateUrl: './next-patient.component.html',
  styleUrls: ['./next-patient.component.css']
})
export class NextPatientComponent implements OnInit {
  // Medicine List 
  medicineList: Array<any>;
  medicine: any;
  effects: '';
  name: '';
  category: '';
  price: Number;

  // Patient Information 
  patient:any; 
  reasonForVisit = ''; 


  constructor(
    private DoctorService: DoctorService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService


  ) {
    
   }

  ngOnInit() {
    this.getDispensedMedicine();
    this.getReasonForVisit();
  }

  getDispensedMedicine() {
    this.DoctorService.getMedicineList().subscribe(
      res => {
        let medicineList = res['medicineList'];
        this.medicineList = medicineList.list;
      },
      err => {
        console.log(err);
      });
  }

  viewDispensedMedicine(medicine) {
    this.medicine = medicine; 
  }

  viewNextPatientInfo(reasonForVisit) {
    this.reasonForVisit = reasonForVisit; 
  }

  // editReasonOfVisitDetail(patient) {
  //   this.reasonForVisit = patient.reasonForVisit; 
  // }

  

  onAddReasonForVisit() {
    if (this.reasonForVisit === '') {
      this.flashMessagesService.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    let reasonForVisit = {
      reasonForVisit : this.reasonForVisit
    };

    this.DoctorService.addReasonForVisit(reasonForVisit).subscribe(res => {
      if (res['success']) {
        this.getReasonForVisit();
        this.flashMessagesService.show('Reason for Visit added', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        if (res['unauthenticated']) {
          this.authService.unAuthenticated();
          return false; 
        }
        this.flashMessagesService.show(res["msg"], { cssClass: 'alert-danger', timeout: 3000 });
      }
     // this.getReasonForVisit(); 

    },
      err => {
        this.flashMessagesService.show('Somewhere broke!', { cssClass: 'alert-danger', timeout: 3000 });

      });

  }

  getReasonForVisit() {
    this.DoctorService.getReasonForVisit().subscribe(
      res => {
        if (res['success']) {
          this.reasonForVisit = res['reasonForVisit'];
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false; 
        }
      }
    })
  }
}