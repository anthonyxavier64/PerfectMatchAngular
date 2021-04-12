import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { JobService } from 'src/app/services/job.service';
import { StartupLocation } from 'src/app/enumeration/startup-location.enum';

@Component({
  selector: 'app-view-all-jobs',
  templateUrl: './view-all-jobs.component.html',
  styleUrls: ['./view-all-jobs.component.css'],
  providers: [MessageService],
})
export class ViewAllJobsComponent {
  jobs: any[];
  displayedJobs: any[];
  isLogin: boolean = true;
  isLoading: boolean = true;
  sortOptions: [{}, {}];
  areaOptions: [{}, {}, {}, {}, {}];
  sortOrder: number;
  sortField: string;
  searchNameString: string = '';
  searchIndustryString: string = '';
  searchSkillsString: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private jobService: JobService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.jobs = new Array();
    this.displayedJobs = new Array();
    this.sortOptions = [
      { label: 'High to Low', value: 'HighToLow' },
      { label: 'Low to High', value: 'LowToHigh' },
    ];
    this.areaOptions = [
      { label: 'North', value: 'NORTH' },
      { label: 'East', value: 'EAST' },
      { label: 'South', value: 'SOUTH' },
      { label: 'West', value: 'WEST' },
      { label: 'Central', value: 'CENTRAL' },
    ];
    this.sortOrder = -1;
    this.sortField = '';
  }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(
      (response) => {
        let result: any[] = new Array();

        response.forEach((job) => {
          let earliestStart = undefined;
          let latestStart = undefined;
          if (job.earliestStartDate !== undefined) {
            earliestStart = new Date(job.earliestStartDate);
          }
          if (job.latestStartDate !== undefined) {
            latestStart = new Date(job.latestStartDate);
          }
          
          let editedJob = {
            postingId: job.postingId,
            title: job.title,
            description: job.description,
            pay: job.pay,
            earliestStartDate: earliestStart,
            latestStartDate: latestStart,
            industry: job.industry,
            requiredSkills: job.requiredSkills,
            startup: job.startup,
          };
          this.jobs.push(editedJob);
          this.displayedJobs.push(editedJob);
        });
        this.isLoading = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to retrieve jobs.',
        });
      }
    );
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('H') === 0) {
      this.displayedJobs.sort((a, b) => (a.pay > b.pay ? -1 : 1));
    } else {
      this.displayedJobs.sort((a, b) => (a.pay > b.pay ? 1 : -1));
    }
  }

  onAreaChange(event: any) {
    let value = event.value;

    this.displayedJobs = new Array();

    if (value.indexOf('N') == 0) {
      this.jobs.forEach((job) => {
        if (job.startup.startupLocation === 'NORTH') {
          console.log('here')
          this.displayedJobs.push(job);
        }
      });
    } else if (value.indexOf('E') == 0) {
      this.jobs.forEach((job) => {
        if (job.startup.startupLocation === 'EAST') {
          this.displayedJobs.push(job);
        }
      });
    } else if (value.indexOf('S') == 0) {
      this.jobs.forEach((job) => {
        if (job.startup.startupLocation === 'SOUTH') {
          this.displayedJobs.push(job);
        }
      });
    } else if (value.indexOf('C') == 0) {
      this.jobs.forEach((job) => {
        if (job.startup.startupLocation === 'CENTRAL') {
          this.displayedJobs.push(job);
        }
      });
    } else {
      this.jobs.forEach((job) => {
        if (job.startup.startupLocation === 'WEST') {
          this.displayedJobs.push(job);
        }
      });
    }
  }

  searchNameEvent(event: any) {
    this.displayedJobs = new Array();
    event.data === null
      ? (this.searchNameString = this.searchNameString.substring(
          0,
          this.searchNameString.length - 1
        ))
      : (this.searchNameString += event.data.toLowerCase());
    this.jobs.forEach((job) => {
      if (job.title.toLowerCase().includes(this.searchNameString)) {
        this.displayedJobs.push(job);
      }
    });
  }

  searchIndustryEvent(event: any) {
    this.displayedJobs = new Array();
    event.data === null
      ? (this.searchIndustryString = this.searchIndustryString.substring(
          0,
          this.searchIndustryString.length - 1
        ))
      : (this.searchIndustryString += event.data.toLowerCase());
    this.jobs.forEach((job) => {
      if (job.industry.toLowerCase().startsWith(this.searchIndustryString)) {
        this.displayedJobs.push(job);
      }
    });
  }

  searchSkillsEvent(event: any) {
    this.displayedJobs = new Array();
    event.data === null
      ? (this.searchSkillsString = this.searchSkillsString.substring(
          0,
          this.searchSkillsString.length - 1
        ))
      : (this.searchSkillsString += event.data.toLowerCase());
    this.jobs.forEach((job) => {
      let requiredSkills: string[] = job.requiredSkills;

      for (let skill of requiredSkills) {
        if (skill.toLowerCase().startsWith(this.searchSkillsString)) {
          this.displayedJobs.push(job);
          break;
        }
      }
    });
  }

  compare(first: number, second: number): number {
    if (first < second) {
      return -1;
    } else if (first > second) {
      return 1;
    }
    return 0;
  }
}
