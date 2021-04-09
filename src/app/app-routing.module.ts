import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ViewAllJobsComponent } from './postings/view-all-jobs/view-all-jobs.component';
import { RegisterComponent } from './register/register.component';
import { ViewprofileComponent } from './profile/viewprofile/viewprofile.component';
import { ViewprojectsComponent } from './postings/viewprojects/viewprojects.component';
import { ProjectdetailsComponent } from './postings/projectdetails/projectdetails.component';
import { ViewJobDetailsComponent } from './postings/view-job-details/view-job-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'postings/viewAllJobs', component: ViewAllJobsComponent},
  { path: 'profile/viewProfile', component: ViewprofileComponent},
  { path: 'postings/viewProjects', component: ViewprojectsComponent},
  { path: 'postings/viewProjectDetails', component: ProjectdetailsComponent},
  { path: 'postings/viewProjectDetails/:projectId', component: ProjectdetailsComponent},
  { path: 'postings/viewJobDetails', component: ViewJobDetailsComponent},
  { path: 'postings/viewJobDetails/:postingId', component: ViewJobDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
