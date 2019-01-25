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
  reasonForVisit = ''; 
  doctor:any;

  // selected medicine
  selectedMedicine: any; 
  selectedMedicineList: Array<any>; 


  // patient in the queue list
  queuelist: Array<any>;


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
    this.getCurrentPatient();
    this.onGetMedicine();
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

  viewNextPatientInfo(patient) {
    this.patient = patient; 
  }

  

  onAddReasonForVisit() {
    if (this.reasonForVisit === '') {
      this.flashMessagesService.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    let patient = {

      reasonForVisit : this.reasonForVisit
    };

    this.DoctorService.addReasonForVisit(patient).subscribe(res => {
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

  onGetMedicine() {
    this.DoctorService.getMedicine().subscribe(
      res => {
        if (res['success']) {
          this.selectedMedicine = res['selectedMedicine'];
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
        }
      })
  }

  onAddMedicine() {
    let selectedMedicine = {
      selectedMedicine: this.selectedMedicine
    };

    this.DoctorService.addMedicine(selectedMedicine).subscribe(res => {
      if (res['success']) {
        this.onGetMedicine();
        this.flashMessagesService.show('Medicine for Patient added', { cssClass: 'alert-success', timeout: 3000 });
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

  // get current patient details 
  getCurrentPatient() {
    this.DoctorService.getCurrentPatient().subscribe(
      res => {
        console.log(res);
        if (!res['success']) {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000 });
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
        }
        this.queuelist = res['queueList'];
      },
      err => {

      }
    )
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