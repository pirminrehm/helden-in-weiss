import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VolunteerCardComponent } from '../home/volunteer-card/volunteer-card.component';
import { HomeComponent } from '../home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { VolunteerListComponent } from '../home/volunteer-list/volunteer-list.component';
import { InstitutionListComponent } from '../home/institution-list/institution-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VolunteerCardComponent,
    HomeComponent,
    VolunteerListComponent,
    InstitutionListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
