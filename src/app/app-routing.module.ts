import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ViewAllJobsComponent } from './postings/view-all-jobs/view-all-jobs.component';
import { RegisterComponent } from './register/register.component';
import { ViewprofileComponent } from './profile/viewprofile/viewprofile.component';
import { ViewprojectsComponent } from './postings/viewprojects/viewprojects.component';
import { ProjectdetailsComponent } from './postings/projectdetails/projectdetails.component';
import { ViewJobDetailsComponent } from './postings/view-job-details/view-job-details.component';
import { ViewoffersComponent } from './offers/viewoffers/viewoffers.component';
import { ViewofferdetailsComponent } from './offers/viewofferdetails/viewofferdetails.component';
import { ViewallapplicationsComponent } from './applications/viewallapplications/viewallapplications.component';
import { ViewapplicationdetailsComponent } from './applications/viewapplicationdetails/viewapplicationdetails.component';
import { ViewAllFavoritesComponent } from './favorites/view-all-favorites/view-all-favorites.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'postings/viewAllJobs', component: ViewAllJobsComponent},
  { path: 'profile/viewProfile', component: ViewprofileComponent},
  { path: 'postings/viewProjects', component: ViewprojectsComponent},
  { path: 'postings/viewProjectDetails', component: ProjectdetailsComponent},
  { path: 'postings/viewProjectDetails/:postingId', component: ProjectdetailsComponent},
  { path: 'postings/viewJobDetails', component: ViewJobDetailsComponent},
  { path: 'postings/viewJobDetails/:postingId', component: ViewJobDetailsComponent},
  { path: 'offers/viewoffers', component: ViewoffersComponent},
  { path: 'offer/viewOffer/:offerId', component: ViewofferdetailsComponent},
  { path: 'applications/viewallapplications', component: ViewallapplicationsComponent},
  { path: 'applications/viewapplicationdetails/:applicationId', component: ViewapplicationdetailsComponent},
  { path: 'favorites/viewAllFavorites', component: ViewAllFavoritesComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
