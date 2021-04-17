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
import { ProjectService } from 'src/app/services/project.service';
import { ReviewOfStartup } from 'src/app/models/review-of-startup';
import { ReviewWrapper } from 'src/app/models/review-wrapper';

@Component({
  selector: 'app-view-work-experience',
  templateUrl: './view-work-experience.component.html',
  styleUrls: ['./view-work-experience.component.css'],
  providers: [MessageService],
})
export class ViewWorkExperienceComponent {
  postings: any[];
  displayedPostings: any[];
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
  reviews: ReviewOfStartup[];

  displayForm : boolean;
  stars: number = 5;
  reviewMessage: string = "";

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
    private projectService: ProjectService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.student = this.sessionService.getCurrentStudent();
    this.postings = new Array();
    this.displayedPostings = new Array();
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
    this.reviews = new Array();

    this.displayForm = false;
  }

  ngOnInit(): void {
    this.student = this.sessionService.getCurrentStudent();
    this.retrievePostings();
    this.retrieveReviews();
    this.displayedPostings = this.postings;
  }

  retrievePostings() {
    if (this.student != null && this.student.studentId != null) {
      this.studentService.getStudentWork(this.student.studentId).subscribe(
        (response) => {
          response.forEach((posting) => {
            this.postings.push(posting);
          });
          this.isLoading = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve work experience.',
          });
        }
      );
    }
  }

  retrieveReviews() {
    if (this.student != null && this.student.studentId != null) {
      this.studentService.getReviewsByStudent(this.student.studentId).subscribe(
        (response) => {
          response.forEach((review) => {
            this.reviews.push(review);
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve reviews.',
          });
        }
      );
    }
  }

  hasReviewed(posting : Posting) : boolean {
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].startUpBeingRated?.startupId == posting.startup?.startupId) {
        return true;
      }
    }
    return false;
  }

  displayReviewForm() {
      this.displayForm = true;
  }

  createNewReview(posting: Posting) {
    let newReview : ReviewWrapper = new ReviewWrapper();
    newReview.rating = this.stars;
    newReview.review = this.reviewMessage;
    newReview.studentId = this.student?.studentId;
    newReview.startUpBeingRatedId = posting.startup?.startupId;
 
    this.studentService.createNewReview(newReview).subscribe(
      response => {
        let returnedReview: ReviewWrapper = response;
        this.messageService.add({
          severity: 'success', summary: "New review with ID " + returnedReview.reviewOfStartUpId + " created successfully"
        });
        this.displayForm = false;
      },
      error => {
        this.messageService.add({
          severity: 'error', summary: "Error", detail: 'Unable to create review.'
        })
      }
    );
  }

  reset() {
    this.displayedPostings = this.postings;
    this.sortOrder = -1;
    this.sortField = '';
    this.searchNameString = '';
    this.searchIndustryString = '';
    this.searchSkillsString = '';
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('H') === 0) {
      this.displayedPostings.sort((a, b) => (a.pay > b.pay ? -1 : 1));
    } else {
      this.displayedPostings.sort((a, b) => (a.pay > b.pay ? 1 : -1));
    }
  }

  onAreaChange(event: any) {
    let value = event.value;

    this.displayedPostings = new Array();

    if (value.indexOf('N') == 0) {
      this.postings.forEach((posting) => {
        if (posting.startup.startupLocation === 'NORTH') {
          this.displayedPostings.push(posting);
        }
      });
    } else if (value.indexOf('E') == 0) {
      this.postings.forEach((posting) => {
        if (posting.startup.startupLocation === 'EAST') {
          this.displayedPostings.push(posting);
        }
      });
    } else if (value.indexOf('S') == 0) {
      this.postings.forEach((posting) => {
        if (posting.startup.startupLocation === 'SOUTH') {
          this.displayedPostings.push(posting);
        }
      });
    } else if (value.indexOf('C') == 0) {
      this.postings.forEach((posting) => {
        if (posting.startup.startupLocation === 'CENTRAL') {
          this.displayedPostings.push(posting);
        }
      });
    } else {
      this.postings.forEach((posting) => {
        if (posting.startup.startupLocation === 'WEST') {
          this.displayedPostings.push(posting);
        }
      });
    }
  }

  searchNameEvent(event: any) {
    this.displayedPostings = new Array();
    event.data === null
      ? (this.searchNameString = this.searchNameString.substring(
        0,
        this.searchNameString.length - 1
      ))
      : (this.searchNameString += event.data.toLowerCase());
    this.postings.forEach((posting) => {
      if (posting.title.toLowerCase().includes(this.searchNameString)) {
        this.displayedPostings.push(posting);
      }
    });
  }

  searchIndustryEvent(event: any) {
    this.displayedPostings = new Array();
    event.data === null
      ? (this.searchIndustryString = this.searchIndustryString.substring(
        0,
        this.searchIndustryString.length - 1
      ))
      : (this.searchIndustryString += event.data.toLowerCase());
    this.postings.forEach((posting) => {
      if (posting.industry.toLowerCase().startsWith(this.searchIndustryString)) {
        this.displayedPostings.push(posting);
      }
    });
  }

  searchSkillsEvent(event: any) {
    this.displayedPostings = new Array();
    event.data === null
      ? (this.searchSkillsString = this.searchSkillsString.substring(
        0,
        this.searchSkillsString.length - 1
      ))
      : (this.searchSkillsString += event.data.toLowerCase());
    this.postings.forEach((posting) => {
      let requiredSkills: string[] = posting.requiredSkills;

      for (let skill of requiredSkills) {
        if (skill.toLowerCase().startsWith(this.searchSkillsString)) {
          this.displayedPostings.push(posting);
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
