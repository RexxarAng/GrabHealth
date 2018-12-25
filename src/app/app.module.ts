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
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ValidateService } from './services/validate.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './guards/auth.interceptor';
import { PatientListComponent } from './recep/patient-list/patient-list.component';
import { SearchComponent } from './recep/search/search.component';
import { SearchListComponent } from './recep/search-list/search-list.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { DoctorMainComponent } from './doctor/doctor-main/doctor-main.component';
import { NextPatientComponent } from './doctor/next-patient/next-patient.component';
import { ViewPatientDetailsComponent } from './doctor/view-patient-details/view-patient-details.component';
import { FileSelectDirective } from 'ng2-file-upload';


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
    RegisterComponent,
    PatientListComponent,
    SearchComponent,
    SearchListComponent,
    MainLoginComponent,
    DoctorMainComponent,
    NextPatientComponent,
    ViewPatientDetailsComponent,
    FileSelectDirective,

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
    })


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    ValidateService, AuthService, AuthGuard, AdminService],
  bootstrap: [AppComponent]
})

export class AppModule {}
