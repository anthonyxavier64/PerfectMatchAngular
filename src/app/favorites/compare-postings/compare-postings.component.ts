import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from 'src/app/services/session.service';
import { MessageService } from 'primeng/api';
import { Project } from 'src/app/models/project';
import { PostingService } from 'src/app/services/posting.service';
import { Posting } from 'src/app/models/posting';

@Component({
  selector: 'app-compare-postings',
  templateUrl: './compare-postings.component.html',
  styleUrls: ['./compare-postings.component.css'],
  providers: [MessageService],
})
export class ComparePostingsComponent {

  isLogin: boolean = true;
  milestones: string[] | undefined;

  posting1Id: string | null;
  posting2Id: string | null;

  posting1: any;
  posting2: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Output()
  childEvent = new EventEmitter<boolean>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private postingService: PostingService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.posting1Id = null;
    this.posting2Id = null;
  }

  ngOnInit(): void {
    this.posting1Id = this.activatedRoute.snapshot.paramMap.get('posting1Id');
    this.posting2Id = this.activatedRoute.snapshot.paramMap.get('posting2Id');
    if (this.posting1Id !== null) {
      this.postingService.getPostingById(parseInt(this.posting1Id)).subscribe(
        (response) => {
          console.log(response)
          let earliestStart = undefined;
          let latestStart = undefined;
          if (response.earliestStartDate !== undefined) {
            earliestStart = new Date(response.earliestStartDate);
          }
          if (response.latestStartDate !== undefined) {
            latestStart = new Date(response.latestStartDate);
          }
          this.posting1 = response;
          this.posting1.earliestStartDate = earliestStart;
          this.posting1.LatestStartDate = latestStart;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve project 1.',
          });
        }
      );
    }
    if (this.posting2Id !== null) {
      this.postingService.getPostingById(parseInt(this.posting2Id)).subscribe(
        (response) => {
          console.log(response)
          let earliestStart = undefined;
          let latestStart = undefined;
          if (response.earliestStartDate !== undefined) {
            earliestStart = new Date(response.earliestStartDate);
          }
          if (response.latestStartDate !== undefined) {
            latestStart = new Date(response.latestStartDate);
          }
          this.posting2 = response;
          this.posting2.earliestStartDate = earliestStart;
          this.posting2.LatestStartDate = latestStart;
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

  isProject(posting: Posting): boolean {
    if (posting instanceof Project) {
      return true;
    }
    return false;
  }
}
