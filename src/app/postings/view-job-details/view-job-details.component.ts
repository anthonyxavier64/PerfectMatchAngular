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
  jobId: string | null;
  job: Job;

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
    this.jobId = '';
    this.job = new Job();
  }

  ngOnInit(): void {
    this.jobId = this.activatedRoute.snapshot.paramMap.get('jobId');
    if (this.jobId !== null) {
      this.jobService.getJobById(parseInt(this.jobId)).subscribe(
        (response) => {
          this.job = response;
          console.log(this.job);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve job.',
          });
          this.router.navigate(['/viewAllJobs']);
        }
      );
    }
  }
}
