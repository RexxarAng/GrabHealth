import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './recep/payment/payment.component';
import { PatientListComponent } from './recep/patient-list/patient-list.component';
import { SearchComponent } from './recep/search/search.component';
import { ViewQueueComponent } from './recep/view-queue/view-queue.component';
import { PaymentReceiptComponent } from './recep/payment-receipt/payment-receipt.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { DoctorMainComponent } from './doctor/doctor-main/doctor-main.component';
import { NextPatientComponent } from './doctor/next-patient/next-patient.component';
import { ViewPatientDetailsComponent } from './doctor/view-patient-details/view-patient-details.component';
import { RegistrationComponent } from './doctor/registration/registration.component';
import { MedicinelistComponent } from './manager/medicinelist/medicinelist.component';
import { TeamComponent } from './manager/team/team.component';

const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: MainLoginComponent},
  { path: 'main-login', component: MainLoginComponent},
  { path: 'receptionist/payment', component: PaymentComponent, canActivate:[AuthGuard]},
  { path: 'receptionist/patient-list', component: PatientListComponent, canActivate:[AuthGuard]},
  { path: 'clinic/registration', component: RegisterComponent, canActivate:[AuthGuard]},
  { path: 'receptionist/search', component: SearchComponent, canActivate:[AuthGuard]},
  { path: 'receptionist/view-queue', component: ViewQueueComponent, canActivate:[AuthGuard]},
  { path: 'receptionist/payment-receipt', component: PaymentReceiptComponent, canActivate:[AuthGuard]},
  { path: 'manager/clinic-team', component: TeamComponent, canActivate:[AuthGuard]},
  { path: 'manager/medicine-list', component: MedicinelistComponent, canActivate:[AuthGuard]},
  { path: 'doctor/doctor-main', component: DoctorMainComponent },
  { path: 'doctor/next-patient', component: NextPatientComponent },
  { path: 'doctor/view-patient-details', component: ViewPatientDetailsComponent },
  { path: 'doctor/registration', component: RegistrationComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
