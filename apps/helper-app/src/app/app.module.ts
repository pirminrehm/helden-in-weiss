import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings
} from 'ng-recaptcha';
import { FaqComponent } from '../faq/faq.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { InstitutionListComponent } from '../home/institution-list/institution-list.component';
import { VolunteerCardComponent } from '../home/volunteer-card/volunteer-card.component';
import { VolunteerListComponent } from '../home/volunteer-list/volunteer-list.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterInstitutionComponent } from './register-institution/register-institution.component';
import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';
import { ImprintComponent } from '../imprint/imprint.component';
import { PrivacyComponent } from '../privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    VolunteerCardComponent,
    HomeComponent,
    RegisterVolunteerComponent,
    VolunteerListComponent,
    InstitutionListComponent,
    HeaderComponent,
    FaqComponent,
    RegisterInstitutionComponent,
    HeaderComponent,
    ImprintComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Le92eMUAAAAAEDD70XEc2agv0OVTwWEFzJYkkDm'
      } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
