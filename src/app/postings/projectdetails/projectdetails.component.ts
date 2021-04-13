import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Project } from 'src/app/models/project';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { MessageService } from 'primeng/api';
import { Application } from 'src/app/models/application';
import { SessionService } from 'src/app/services/session.service';
import { ApplicationStatus } from 'src/app/enumeration/application-status.enum';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css'],
  providers: [MessageService],
})
export class ProjectdetailsComponent implements OnInit {
  isLogin: boolean = true;
  postingId: string | null;
  projectToView: any;
  milestones: string[] | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Output()
  childEvent = new EventEmitter<boolean>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private projectService: ProjectService,
    private messageService: MessageService,
    public applicationService: ApplicationService,
    private router: Router
  ) {
    this.postingId = null;
    this.projectToView = new Project();
  }

  ngOnInit(): void {
    this.postingId = this.activatedRoute.snapshot.paramMap.get('postingId');
    if (this.postingId !== null) {
      this.projectService.getProjectById(parseInt(this.postingId)).subscribe(
        (response) => {
            let earliestStart = undefined;
            let latestStart = undefined;
            if (response.earliestStartDate !== undefined) {
              earliestStart = new Date(response.earliestStartDate);
            }
            if (response.latestStartDate !== undefined) {
              latestStart = new Date(response.latestStartDate);
            }
            this.projectToView.postingId = response.postingId;
            this.projectToView.title = response.title;
            this.projectToView.description = response.description;
            this.projectToView.pay = response.pay;
            this.projectToView.earliestStartDate = earliestStart;
            this.projectToView.latestStartDate = latestStart;
            this.projectToView.industry = response.industry;
            this.projectToView.requiredSkills = response.requiredSkills;
            this.projectToView.projectSpecialisation = response.projectSpecialisation;
            this.projectToView.isComplete = response.isComplete;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve project.',
          });
        }
      );
    }
  }

  apply() {
    let application: Application = new Application();
    application.offerSent = false;
    application.applicationStatus = ApplicationStatus.PENDING;
    application.postingId = this.projectToView.postingId;
    application.studentId = this.sessionService.getCurrentStudent()?.studentId;
    this.applicationService.createNewApplication(application).subscribe(
      response => {

        this.childEvent.emit(true);
        this.messageService.add({
          severity: 'success', summary: "Application sent successfully"
        });
      },
      error => {
        this.messageService.add({
          severity: 'error', summary: "Error", detail: 'Unable to create application. Could have already applied.'
        })
      }
    );
  }

}
