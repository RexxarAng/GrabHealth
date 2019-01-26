import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


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
  reasonForVisit = '';
  doctor: any;
  medicineInstructions: '';

  // selected medicine
  selectedMedicine: any;
  selectedMedicineList: Array<any> = [];
 
  // patient in the queue list
  queuelist: Array<any>;
  patients: Array<any>;

  constructor(
    private DoctorService: DoctorService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router


  ) {

  }

  ngOnInit() {
    this.getDispensedMedicine();
    this.getReasonForVisit();
    this.getCurrentPatient();
    this.getInstructions(); 
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

  viewCurrentPatientInfo(patient) {
    this.patient = patient;
  }


  savePatientDetails(patient) {
    this.patient = patient;
  }
  onSavePatientDetails() {

    this.patient.reasonForVisit = this.reasonForVisit;
    
    if (this.reasonForVisit === '') {
      this.flashMessagesService.show("Please enter the patient's reason for visit", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    this.DoctorService.savePatientDetails(this.patient).subscribe(res => {
      if (res['success']) {
        this.getReasonForVisit();
        this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigateByUrl('/doctor/doctor-main');
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

  getInstructions() {
    this.DoctorService.getInstructions().subscribe(
      res => {
        if (res['success']) {
          this.medicine.medicineInstructions = res['medicineInstructions'];
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
        }
      })
  }

  // onAddMedicine(medicine) {
  //   let selectedMedicine = {
  //     name: medicine.name,
  //     queueNo: this.patient.queueNo,
  //     price: medicine.price,
  //     category: medicine.category,
  //     effect: medicine.effect
  //       };


  //   this.DoctorService.addMedicine(selectedMedicine).subscribe(res => {
  //     if (res['success']) {
  //       this.selectedMedicineList.push(selectedMedicine); 
  //       this.onGetMedicine();
  //       this.flashMessagesService.show('Medicine for Patient added', { cssClass: 'alert-success', timeout: 3000 });
  //     } else {
  //       if (res['unauthenticated']) {
  //         this.authService.unAuthenticated();
  //         return false;
  //       }
  //       this.flashMessagesService.show(res["msg"], { cssClass: 'alert-danger', timeout: 3000 });
  //     }
  //     // this.getReasonForVisit(); 

  //   },
  //     err => {
  //       this.flashMessagesService.show('Somewhere broke!', { cssClass: 'alert-danger', timeout: 3000 });

  //     });
  // }
  onAddMedicine(medicine){
    console.log(medicine);
    this.selectedMedicineList.push(medicine);
  }
  onCreateVisit(){
    let visit = {
      reasonForVisit: this.reasonForVisit,
      medicineList: this.selectedMedicineList,
      queueNo: this.patient.queueNo,
      patient: this.patient
    }
    this.DoctorService.createVisit(visit).subscribe(res=>{
      if (res['success']) {
        this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigateByUrl("/doctor/doctor-main");
      } else {
        if (res['unauthenticated']) {
          this.authService.unAuthenticated();
          return false;
        }
        this.flashMessagesService.show(res["msg"], { cssClass: 'alert-danger', timeout: 3000 });
      }
      // this.getReasonForVisit();
    })

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
        this.patient = res['queueList'];
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
          // this.instructions = res['instructions']; 
        } else {
          if (res['unauthenticated']) {
            this.authService.unAuthenticated();
            return false;
          }
        }
      })
  }
}