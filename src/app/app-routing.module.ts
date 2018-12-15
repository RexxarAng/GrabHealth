import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegisterComponent } from './register/register.component';
import { PaymentComponent } from './recep/payment/payment.component';
import { PatientListComponent } from './recep/patient-list/patient-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'admin/clinic/registration', component: RegisterComponent},
  { path: 'receptionist/payment', component: PaymentComponent },
  { path: 'receptionist/patient-list', component: PatientListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
