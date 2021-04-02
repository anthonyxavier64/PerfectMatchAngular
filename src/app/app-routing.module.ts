import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ViewAllJobsComponent } from './jobs/view-all-jobs/view-all-jobs.component';
import { RegisterComponent } from './register/register.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'viewAllJobs', component: ViewAllJobsComponent},
  { path: 'viewProfile', component: ViewprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
