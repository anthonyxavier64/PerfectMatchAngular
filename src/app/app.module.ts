import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { LoginformComponent } from './loginform/loginform.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ViewAllJobsComponent } from './postings/view-all-jobs/view-all-jobs.component';
import { ViewprofileComponent } from './profile/viewprofile/viewprofile.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { ViewprojectsComponent } from './postings/viewprojects/viewprojects.component';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectdetailsComponent } from './postings/projectdetails/projectdetails.component';
import { ViewJobDetailsComponent } from './postings/view-job-details/view-job-details.component';
import { ViewoffersComponent } from './offers/viewoffers/viewoffers.component';
import {OrderListModule} from 'primeng/orderlist';
import { ViewofferdetailsComponent } from './offers/viewofferdetails/viewofferdetails.component';
import {RatingModule} from 'primeng/rating';
import { ViewallapplicationsComponent } from './applications/viewallapplications/viewallapplications.component';
import { ViewapplicationdetailsComponent } from './applications/viewapplicationdetails/viewapplicationdetails.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ViewAllFavoritesComponent } from './favorites/view-all-favorites/view-all-favorites.component';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { ViewWorkExperienceComponent } from './work/view-work-experience/view-work-experience.component';
import { FooterComponent } from './footer/footer.component';
import { ViewstartupdetailsComponent } from './startup/viewstartupdetails/viewstartupdetails.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ComparePostingsComponent } from './favorites/compare-postings/compare-postings.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ViewPaymentsComponent } from './payments/view-payments/view-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterComponent,
    MainmenuComponent,
    LoginformComponent,
    ViewAllJobsComponent,
    ViewprofileComponent,
    EditprofileComponent,
    ViewprojectsComponent,
    ProjectdetailsComponent,
    ViewJobDetailsComponent,
    ViewoffersComponent,
    ViewofferdetailsComponent,
    ViewallapplicationsComponent,
    ViewapplicationdetailsComponent,
    ViewAllFavoritesComponent,
    ViewWorkExperienceComponent,
    FooterComponent,
    ViewstartupdetailsComponent,
    ComparePostingsComponent,
    ViewPaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    InputTextModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    TabMenuModule,
    FieldsetModule,
    CardModule,
    DataViewModule,
    DropdownModule,
    OrderListModule,
    RatingModule,
    MatFormFieldModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DialogModule,
    MatDialogModule,
    MatBadgeModule,
    // TimelineModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
