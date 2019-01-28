import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgxElectronModule } from 'ngx-electron';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
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
import { MainLoginComponent } from './main-login/main-login.component';
import { DoctorMainComponent } from './doctor/doctor-main/doctor-main.component';
import { NextPatientComponent } from './doctor/next-patient/next-patient.component';
import { ViewPatientDetailsComponent } from './doctor/view-patient-details/view-patient-details.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MedicinelistComponent } from './manager/medicinelist/medicinelist.component';
import { GrdFilterPipe } from './grd-filter.pipe';
import { PendingApprovalComponent } from './recep/pending-approval/pending-approval.component';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { QueueListComponent } from './recep/queue-list/queue-list.component';
import { AllPatientListComponent } from './recep/all-patient-list/all-patient-list.component';
import { DoctorChangePasswordComponent } from './doctor/doctor-change-password/doctor-change-password.component';
import { ManagerChangePasswordComponent } from './manager/manager-change-password/manager-change-password.component';
import { RecepChangePasswordComponent } from './recep/recep-change-password/recep-change-password.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Md5 } from 'ts-md5/dist/md5';



export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegistrationComponent,
    NavComponent,
    PaymentComponent,
    PatientListComponent,
    TeamComponent,
    MainLoginComponent,
    DoctorMainComponent,
    NextPatientComponent,
    ViewPatientDetailsComponent,
    MedicinelistComponent,
    GrdFilterPipe,
    PendingApprovalComponent,
    QueueListComponent,
    AllPatientListComponent,
    DoctorChangePasswordComponent,
    ManagerChangePasswordComponent,
    RecepChangePasswordComponent

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
    FileUploadModule,
    NgbModule.forRoot(),
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:4560/'],
        blacklistedRoutes: ['http://localhost:4560/authenticate']
      }
    }),
    AngularFontAwesomeModule,
    RecaptchaModule.forRoot({
      siteKey: '6LcA4YoUAAAAAL84rMXfcQtktJESJG1Um7Vb7dXT',
    }),
    SignaturePadModule
    


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, ValidateService, AuthService, AuthGuard, AdminService, ManagerService, DoctorService, ReceptionistService],
  bootstrap: [AppComponent]
})

export class AppModule {}
