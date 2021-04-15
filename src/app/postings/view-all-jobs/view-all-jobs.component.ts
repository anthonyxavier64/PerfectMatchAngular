import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { JobService } from 'src/app/services/job.service';
import { StartupLocation } from 'src/app/enumeration/startup-location.enum';
import { Job } from 'src/app/models/job';
import { SessionService } from 'src/app/services/session.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentWrapper } from 'src/app/models/student-wrapper';
import { Posting } from 'src/app/models/posting';
import { Favourites } from 'src/app/models/favourites';
import { Router } from '@angular/router';

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
  bookmarkIds: number[];
  sortOrder: number;
  sortField: string;
  searchNameString: string = '';
  searchIndustryString: string = '';
  searchSkillsString: string = '';

  student: StudentWrapper | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Output()
  childEvent = new EventEmitter<StudentWrapper>();

  constructor(
    private jobService: JobService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.student = this.sessionService.getCurrentStudent();
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
    this.bookmarkIds = new Array();
  }

  ngOnInit(): void {
    this.student = this.sessionService.getCurrentStudent();

    if (this.student !== undefined) {
      for (let fav of this.student?.favorites) {
        if (fav.post?.postingId !== undefined) {
          this.bookmarkIds.push(fav.post.postingId);
        }
      }
    }

    this.jobService.getJobs().subscribe(
      (response) => {
        response.forEach((job) => {
          let earliestStart = undefined;
          let latestStart = undefined;
          if (job.earliestStartDate !== undefined) {
            earliestStart = new Date(job.earliestStartDate);
          }
          if (job.latestStartDate !== undefined) {
            latestStart = new Date(job.latestStartDate);
          }

          let isBookmarked: boolean = false;

          if (job.postingId !== undefined) {
            if (this.bookmarkIds.includes(job.postingId)) {
              isBookmarked = true;
            }
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
            isBookmarked: isBookmarked,
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

  addToFavorites(job: Job) {
    if (this.student != null) {
      let newFav: Favourites = new Favourites();
      newFav.postingId = job.postingId;
      newFav.studentId = this.student.studentId;
      if (job.postingId !== undefined) {
        this.bookmarkIds.push(job.postingId);
      }
      this.studentService.addFavourite(newFav).subscribe(
        (response) => {
          this.sessionService.setCurrentStudent(response);
          this.messageService.add({
            severity: 'success',
            summary: 'posting added to favorites!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to add to favourites',
          });
        }
      );
    }
  }

  removeFromFavourites(job: Job) {
    if (this.student !== undefined) {
      let newFav: Favourites = new Favourites();
      newFav.postingId = job.postingId;
      newFav.studentId = this.student.studentId;
      let index:number = -1;
      for (let i = 0; i < this.bookmarkIds.length; i++) {
        if (this.bookmarkIds[i] == job.postingId) {
          index = i;
        }
      }
      this.bookmarkIds.splice(index, 1);
      this.studentService.removeFavourite(newFav).subscribe(
        (response) => {
          this.sessionService.setCurrentStudent(response);
          this.messageService.add({
            severity: 'success',
            summary: 'posting removed from favorites!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to remove from favourites',
          });
        }
      );
    }
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('H') === 0) {
      this.displayedJobs.sort((a, b) => (a.pay > b.pay ? -1 : 1));
    } else {
      this.displayedJobs.sort((a, b) => (a.pay > b.pay ? 1 : -1));
    }
  }

  bookmarked(job: any): boolean {
    if (this.student !== undefined) {
      if (this.bookmarkIds?.includes(job.postingId)) {
        return true;
      }
    }
    return false;
  }

  onAreaChange(event: any) {
    let value = event.value;

    this.displayedJobs = new Array();

    if (value.indexOf('N') == 0) {
      this.jobs.forEach((job) => {
        if (job.startup.startupLocation === 'NORTH') {
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

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
