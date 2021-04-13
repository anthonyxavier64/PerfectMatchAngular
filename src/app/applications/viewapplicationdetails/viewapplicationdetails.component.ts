import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Application } from 'src/app/models/application';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'primeng/api';
import { Startup } from 'src/app/models/startup';
import { Project } from 'src/app/models/project';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-viewapplicationdetails',
  templateUrl: './viewapplicationdetails.component.html',
  styleUrls: ['./viewapplicationdetails.component.css'],
  providers: [MessageService],
})
export class ViewapplicationdetailsComponent {
  isLogin: boolean = true;
  application: Application;
  applicationId: string | null;
  startup: Startup;
  posting: any | undefined;
  milestones: string[] | undefined;
  projectSpecialisation: string | undefined;
  isProject: boolean | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService,
    private messageService: MessageService
  ) {
    this.applicationId = null;
    this.application = new Application();
    this.startup = new Startup();
  }

  ngOnInit(): void {
    this.applicationId = this.activatedRoute.snapshot.paramMap.get(
      'applicationId'
    );

    if (this.applicationId !== null) {
      this.applicationService
        .getApplicationById(parseInt(this.applicationId))
        .subscribe(
          (response) => {
            this.application = response;

            let tempPosting: any = response.posting;
            let tempStartup = response.posting?.startup;

            if (tempStartup !== undefined) {
              this.startup = tempStartup;
            }

            let earliestStart = undefined;
            let latestStart = undefined;
            if (tempPosting?.earliestStartDate !== undefined) {
              earliestStart = new Date(tempPosting.earliestStartDate);
            }
            if (tempPosting?.latestStartDate !== undefined) {
              latestStart = new Date(tempPosting.latestStartDate);
            }

            if (tempPosting?.isProject) {
              this.isProject = true;
              this.posting = new Project();
              this.projectSpecialisation = tempPosting.projectSpecialisation;
              this.milestones = tempPosting.milestones;
            } else {
              this.isProject = false;
              this.posting = new Job();
            }

            if (tempPosting !== undefined) {
              this.posting.postingId = tempPosting.postingId;
              this.posting.title = tempPosting.title;
              this.posting.description = tempPosting.description;
              this.posting.pay = tempPosting.pay;
              this.posting.earliestStartDate = earliestStart;
              this.posting.latestStartDate = latestStart;
              this.posting.industry = tempPosting.industry;
              this.posting.requiredSkills = tempPosting.requiredSkills;
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Unable to retrieve application.',
            });
          }
        );
    }
  }
}
