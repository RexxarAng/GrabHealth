import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './recep/payment/payment.component';
import { PatientListComponent } from './recep/patient-list/patient-list.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { DoctorMainComponent } from './doctor/doctor-main/doctor-main.component';
import { NextPatientComponent } from './doctor/next-patient/next-patient.component';
import { ViewPatientDetailsComponent } from './doctor/view-patient-details/view-patient-details.component';
import { RegistrationComponent } from './doctor/registration/registration.component';
import { MedicinelistComponent } from './manager/medicinelist/medicinelist.component';
import { TeamComponent } from './manager/team/team.component';
import { PendingApprovalComponent } from './recep/pending-approval/pending-approval.component';
import { QueueListComponent } from './recep/queue-list/queue-list.component';
import { AllPatientListComponent } from './recep/all-patient-list/all-patient-list.component';
import { DoctorChangePasswordComponent } from './doctor/doctor-change-password/doctor-change-password.component';
import { ManagerChangePasswordComponent } from './manager/manager-change-password/manager-change-password.component';
import { RecepChangePasswordComponent } from './recep/recep-change-password/recep-change-password.component';



const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: MainLoginComponent},
  { path: 'main-login', component: MainLoginComponent},
  { path: 'receptionist/payment', component: PaymentComponent, canActivate:[AuthGuard]},
  { path: 'receptionist/patient-list', component: PatientListComponent, canActivate:[AuthGuard]},
  { path: 'manager/clinic-team', component: TeamComponent, canActivate:[AuthGuard]},
  { path: 'manager/medicine-list', component: MedicinelistComponent, canActivate:[AuthGuard]},
  { path: 'doctor/doctor-main', component: DoctorMainComponent },
  { path: 'doctor/next-patient', component: NextPatientComponent },
  { path: 'doctor/view-patient-details', component: ViewPatientDetailsComponent },
  { path: 'doctor/registration', component: RegistrationComponent },
  { path: 'receptionist/pending-approval', component: PendingApprovalComponent, canActivate:[AuthGuard]},
  { path: 'receptionist/queue-list', component: QueueListComponent, canActivate:[AuthGuard]},
  { path: 'receptionist/all-patient-list', component: AllPatientListComponent, canActivate:[AuthGuard]},
  { path: 'doctor/doctor-change-password', component: DoctorChangePasswordComponent, canActivate:[AuthGuard]},
  { path: 'manager/manager-change-password', component: ManagerChangePasswordComponent, canActivate:[AuthGuard]},
  { path: 'recep/recep-change-password', component: RecepChangePasswordComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
