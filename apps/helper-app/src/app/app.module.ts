import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionCardComponent } from '../action-card/action-card.component';
import { HomeComponent } from '../home/home.component';
import { MaterialModule } from '../material/material.module';
import { VolunteerCardComponent } from '../volunteer-card/volunteer-card.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';

@NgModule({
  declarations: [
    AppComponent,
    VolunteerCardComponent,
    ActionCardComponent,
    HomeComponent,
    RegisterVolunteerComponent
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
