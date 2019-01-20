import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgxElectronModule } from 'ngx-electron';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from './material-module';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './doctor/registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './recep/payment/payment.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ValidateService } from './services/validate.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './guards/auth.interceptor';
import { PatientListComponent } from './recep/patient-list/patient-list.component';
import { TeamComponent } from './manager/team/team.component';
import { ManagerService } from './services/manager.service';
import { DoctorService } from './services/doctor.service';
import { ReceptionistService } from './services/receptionist.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ViewQueueComponent } from './recep/view-queue/view-queue.component';
import { PaymentReceiptComponent } from './recep/payment-receipt/payment-receipt.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { DoctorMainComponent } from './doctor/doctor-main/doctor-main.component';
import { NextPatientComponent } from './doctor/next-patient/next-patient.component';
import { ViewPatientDetailsComponent } from './doctor/view-patient-details/view-patient-details.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { MedicinelistComponent } from './manager/medicinelist/medicinelist.component';
import { GrdFilterPipe } from './grd-filter.pipe';
import { PendingApprovalComponent } from './recep/pending-approval/pending-approval.component';


export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    RegistrationComponent,
    NavComponent,
    PaymentComponent,
    PatientListComponent,
    TeamComponent,
    ViewQueueComponent,
    PaymentReceiptComponent,
    MainLoginComponent,
    DoctorMainComponent,
    NextPatientComponent,
    ViewPatientDetailsComponent,
    FileSelectDirective,
    MedicinelistComponent,
    GrdFilterPipe,
    PendingApprovalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AngularMaterialModule,
    NgbModule.forRoot(),
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:4560/'],
        blacklistedRoutes: ['http://localhost:4560/authenticate']
      }
    }),
    AngularFontAwesomeModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, ValidateService, AuthService, AuthGuard, AdminService, ManagerService, DoctorService, ReceptionistService],
  bootstrap: [AppComponent]
})

export class AppModule {}
