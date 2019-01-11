import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})



export class MedicinelistComponent implements OnInit {
  public searchText: string;
  medicineList:Array<any>;
  medicine: any;
  effects: '';
  name: '';
  category: '';
  price: Number;
  
  constructor(
    private router: Router,
    private managerService: ManagerService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getMedicineList();

  }
  
  getMedicineList(){
    this.managerService.getMedicineList().subscribe(
      res=> {
        if(res['unauthenticated']){
          this.authService.unAuthenticated();
        }
        let medicineList = res['medicineList'];
        this.medicineList = medicineList.list;
      }, 
      err=> {
        console.log(err);
      });
  }

  viewMedicineInfo(medicine){
    this.medicine = medicine;
  }

  removeMedicine(medicine){
    this.medicine = medicine;
  }

  onAddMedicine(){
    if(this.effects === '' || this.category === '' || this.price === undefined || this.name === '') {
      this.flashMessagesService.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    let newMedicine = {
      name: this.name,
      category: this.category,
      price: this.price,
      effects: this.effects
    };
    this.managerService.addMedicine(newMedicine).subscribe(res=>{
      if(res['success']){
        this.getMedicineList();
        this.flashMessagesService.show('Medicine added', { cssClass: 'alert-success', timeout: 3000});
      } else {
        if(res['unauthenticated']){
          this.authService.unAuthenticated();
        }
        this.flashMessagesService.show(res["msg"], { cssClass: 'alert-danger', timeout: 3000});
      }
    },
    err=>{

    });

  }


  onRemoveMedicine(){
    this.managerService.removeMedicine(this.medicine).subscribe(
      res => {
        console.log(res);
        if(res['success']){
          this.getMedicineList();
          this.flashMessagesService.show('Clinic removed!', { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.unAuthenticated();
          }
        }
      },
      err => {

      }
    );
  }

}
