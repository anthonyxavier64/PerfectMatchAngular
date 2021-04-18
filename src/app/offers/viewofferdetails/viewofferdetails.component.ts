import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Offer } from 'src/app/models/offer';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { MessageService } from 'primeng/api';
import { Startup } from 'src/app/models/startup';
import { Posting } from 'src/app/models/posting';
import { Project } from 'src/app/models/project';
import { Job } from 'src/app/models/job';
import { Application } from 'src/app/models/application';
import { ApplicationStatus } from 'src/app/enumeration/application-status.enum';
import { SessionService } from 'src/app/services/session.service';
import { ApplicationService } from 'src/app/services/application.service';
import { OfferStatus } from 'src/app/enumeration/offer-status.enum';

@Component({
  selector: 'app-viewofferdetails',
  templateUrl: './viewofferdetails.component.html',
  styleUrls: ['./viewofferdetails.component.css'],
  providers: [MessageService],
})
export class ViewofferdetailsComponent {
  isLogin: boolean = true;
  offer: Offer;
  startup: Startup;
  posting: any | undefined;
  offerId: string | null;
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
    private offerService: OfferService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private applicationService: ApplicationService
  ) {
    this.offerId = null;
    this.offer = new Offer();
    this.startup = new Startup();
  }

  ngOnInit(): void {
    this.offerId = this.activatedRoute.snapshot.paramMap.get('offerId');

    if (this.offerId !== null) {
      this.offerService.getOfferById(parseInt(this.offerId)).subscribe(
        (response) => {
          let tempPosting: any = response.posting;
          let tempStartup = response.posting?.startup;

          this.offer.offerId = response.offerId;
          this.offer.offerMessage = response.offerMessage;
          this.offer.offerStatus = response.offerStatus;

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
            detail: 'Unable to retrieve offer.',
          });
        }
      );
    }
  }

  declineOffer() {
    this.offer.offerStatus = OfferStatus.REJECTED;
    this.offerService.updateOffer(this.offer).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Offer declined successfully',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to decline offer.',
        });
      }
    );
  }

  isPending(): boolean {
    if (this.offer.offerStatus == OfferStatus.PENDING) {
      return true;
    }
    return false;
  }

  acceptOffer() {
    this.offer.offerStatus = OfferStatus.ACCEPTED;
    this.offerService.updateOffer(this.offer).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Offer accepted successfully',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to accept offer.',
        });
      }
    );
  }

  apply() {
    let application: Application = new Application();
    application.offerSent = false;
    application.applicationStatus = ApplicationStatus.PENDING;
    application.postingId = this.posting.postingId;
    application.studentId = this.sessionService.getCurrentStudent()?.studentId;
    this.applicationService.createNewApplication(application).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Application sent successfully',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error', summary: "Error", detail: 'Unable to create application. An application or offer already exists.'
        });
      }
    );
  }
}
