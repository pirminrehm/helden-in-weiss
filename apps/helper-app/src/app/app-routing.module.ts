import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { VolunteerListComponent } from '../home/volunteer-list/volunteer-list.component';
import { InstitutionListComponent } from '../home/institution-list/institution-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/institutions', pathMatch: 'full' },
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
