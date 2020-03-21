import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FaqComponent } from '../faq/faq.component';

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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
