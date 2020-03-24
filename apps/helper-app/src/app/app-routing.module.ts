import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { InstitutionListComponent } from '../home/institution-list/institution-list.component';
import { VolunteerListComponent } from '../home/volunteer-list/volunteer-list.component';
import { RegisterInstitutionComponent } from './register-institution/register-institution.component';
import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';
import { FaqComponent } from '../faq/faq.component';
import { ImprintComponent } from '../imprint/imprint.component';
import { PrivacyComponent } from '../privacy/privacy.component';

const routes: Routes = [
  // use this as default route for demo
  { path: '', redirectTo: '/home/volunteers', pathMatch: 'full' },
  { path: '*', redirectTo: '/home/volunteers' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'volunteers', component: VolunteerListComponent },
      { path: 'institutions', component: InstitutionListComponent }
    ]
  },
  { path: 'faq', component: FaqComponent, data: { title: 'FAQ' } },
  { path: 'register-volunteer', component: RegisterVolunteerComponent, data: { title: 'Helfer registrieren' } },
  { path: 'register-institution', component: RegisterInstitutionComponent, data: { title: 'Institution registrieren' } },
  { path: 'imprint', component: ImprintComponent, data: { title: 'Impressum' } },
  { path: 'privacy', component: PrivacyComponent, data: { title: 'Datenschutz' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
