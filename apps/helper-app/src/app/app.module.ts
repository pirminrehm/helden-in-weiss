import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { FaqComponent } from '../faq/faq.component';
import { HeaderComponent } from '../header/header.component';
import { ContactCardComponent } from '../home/contact-card/contact-card.component';
import { HomeComponent, QualificationsDialogComponent } from '../home/home.component';
import { InstitutionListComponent } from '../home/institution-list/institution-list.component';
import { VolunteerListComponent } from '../home/volunteer-list/volunteer-list.component';
import { ImprintComponent } from '../imprint/imprint.component';
import { MaterialModule } from '../material/material.module';
import { PrivacyComponent } from '../privacy/privacy.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterInstitutionSuccessComponent } from './register-institution-success/register-institution-success.component';
import { RegisterInstitutionComponent } from './register-institution/register-institution.component';
import { RegisterVolunteerSuccessComponent } from './register-volunteer-success/register-volunteer-success.component';
import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';
import { SharedModule } from './shared/shared.module';
import { MessageFormComponent } from '../home/contact-card/message-form/message-form.component';
import { ValidateComponent } from '../validate/validate.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    HomeComponent,
    RegisterVolunteerComponent,
    VolunteerListComponent,
    InstitutionListComponent,
    HeaderComponent,
    FaqComponent,
    RegisterInstitutionComponent,
    HeaderComponent,
    ImprintComponent,
    PrivacyComponent,
    RegisterVolunteerSuccessComponent,
    RegisterInstitutionSuccessComponent,
    QualificationsDialogComponent,
    MessageFormComponent,
    ValidateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Le92eMUAAAAAEDD70XEc2agv0OVTwWEFzJYkkDm'
      } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent, QualificationsDialogComponent]
})
export class AppModule {}
