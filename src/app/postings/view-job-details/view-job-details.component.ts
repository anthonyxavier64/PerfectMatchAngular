import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Job } from 'src/app/models/job';
import { ActivatedRoute, Router } from '@angular/router';

import { JobService } from '../../services/job.service';
import { MessageService } from 'primeng/api';

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private messageService: MessageService,
    private router: Router
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
}
