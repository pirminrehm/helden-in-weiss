import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { InstitutionListComponent } from '../home/institution-list/institution-list.component';
import { VolunteerListComponent } from '../home/volunteer-list/volunteer-list.component';
import { RegisterInstitutionComponent } from './register-institution/register-institution.component';
import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';
import { FaqComponent } from '../faq/faq.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/institutions', pathMatch: 'full' },
  { path: '*', redirectTo: '/home/institutions' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'volunteers',
        component: VolunteerListComponent
      },
      {
        path: 'institutions',
        component: InstitutionListComponent
      }
    ]
  },
  { path: 'faq', component: FaqComponent },
  { path: 'register-volunteer', component: RegisterVolunteerComponent },
  { path: 'register-institution', component: RegisterInstitutionComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
