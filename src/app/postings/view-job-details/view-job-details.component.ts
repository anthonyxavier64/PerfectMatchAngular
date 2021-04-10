import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Job } from 'src/app/models/job';
import { ActivatedRoute, Router } from '@angular/router';

import { JobService } from '../../services/job.service';
import { Application } from 'src/app/models/application';
import { ApplicationStatus } from 'src/app/enumeration/application-status.enum';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-view-job-details',
  templateUrl: './view-job-details.component.html',
  styleUrls: ['./view-job-details.component.css'],
  providers: [MessageService],
})
export class ViewJobDetailsComponent implements OnInit {
  isLogin: boolean = true;
  postingId: string | null;
  jobToView: Job;
  retrieveJobError: boolean;
  requiredSkills: string[] | undefined;

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
    private jobService: JobService,
    private messageService: MessageService,
    private router: Router,

    private sessionService: SessionService,
    public applicationService: ApplicationService,
  ) {
    this.postingId = null;
    this.jobToView = new Job();
    this.retrieveJobError = false;
  }

  ngOnInit(): void {
    this.postingId = this.activatedRoute.snapshot.paramMap.get('postingId');
    if (this.postingId !== null) {
      this.jobService.getJobById(parseInt(this.postingId)).subscribe(
        (response) => {
          this.jobToView = response;
          this.requiredSkills = this.jobToView.requiredSkills;
          console.log(this.jobToView);
        },
        (error) => {
          this.retrieveJobError = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve job.',
          });
          this.router.navigate(['postings/viewAllJobs']);
        }
      );
    }
  }

  apply() {
    let application: Application = new Application();
    application.offerSent = false;
    application.applicationStatus = ApplicationStatus.APPLIED.toString();
    application.postingId = this.jobToView.postingId;
    application.studentId = this.sessionService.getCurrentStudent()?.studentId;
    this.applicationService.createNewApplication(application).subscribe(
      response => {
        let newApplication: Application = response;
        if (newApplication.applicationId == null) {
          this.messageService.add({
            severity: 'error', summary: "Application for this posting already exists"
          });
          return;
        }
        this.childEvent.emit(true);
        this.messageService.add({
          severity: 'success', summary: "New application with ID " + newApplication.applicationId + " created successfully"
        });
      },
      error => {
        this.messageService.add({
          severity: 'error', summary: "Error", detail: 'Unable to create application.'
        })
      }
    );
  }
}
