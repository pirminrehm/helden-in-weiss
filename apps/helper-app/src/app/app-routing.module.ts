import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { InstitutionListComponent } from './home/institution-list/institution-list.component';
import { VolunteerListComponent } from './home/volunteer-list/volunteer-list.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterInstitutionSuccessComponent } from './register-institution-success/register-institution-success.component';
import { RegisterInstitutionComponent } from './register-institution/register-institution.component';
import { RegisterVolunteerSuccessComponent } from './register-volunteer-success/register-volunteer-success.component';
import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';
import { ValidateComponent } from './validate/validate.component';

const routes: Routes = [
  // use this as default route for demo
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: InstitutionListComponent },
      { path: 'volunteers', component: VolunteerListComponent }
    ]
  },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'home/institutions', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'register-volunteer',
    component: RegisterVolunteerComponent,
    data: { title: 'Helfer registrieren' }
  },
  {
    path: 'register-institution',
    component: RegisterInstitutionComponent,
    data: { title: 'Institution registrieren' }
  },
  {
    path: 'register-volunteer/success',
    component: RegisterVolunteerSuccessComponent,
    data: { title: 'Helfer registrieren' }
  },
  {
    path: 'register-institution/success',
    component: RegisterInstitutionSuccessComponent,
    data: { title: 'Institution registrieren' }
  },
  { path: 'faq', component: FaqComponent, data: { title: 'FAQ' } },
  {
    path: 'imprint',
    component: ImprintComponent,
    data: { title: 'Impressum' }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: { title: 'Datenschutz' }
  },
  {
    path: 'validate',
    component: ValidateComponent,
    data: { title: 'Registrierung' }
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
