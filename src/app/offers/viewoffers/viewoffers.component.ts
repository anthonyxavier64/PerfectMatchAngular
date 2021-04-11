import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Offer } from 'src/app/models/offer';
import { Posting } from 'src/app/models/posting';
import { StudentWrapper } from 'src/app/models/student-wrapper';
import { OfferService } from 'src/app/services/offer.service';
import { SessionService } from 'src/app/services/session.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-viewoffers',
  templateUrl: './viewoffers.component.html',
  styleUrls: ['./viewoffers.component.css'],
  providers: [MessageService],
})
export class ViewoffersComponent implements OnInit {

  isLogin: boolean = true;
  isLoading: boolean = true;

  offers: Offer[];
  student: StudentWrapper | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private studentService: StudentService,
    private offerService: OfferService,
    private messageService: MessageService) {
    this.offers = new Array();
    this.student = this.sessionService.getCurrentStudent();
  }

  ngOnInit(): void {
    this.retrieveOffers();
    for (var offer of this.offers) {
      this.retrieveOfferPosting(offer);
    }
  }

  retrieveOfferPosting(offer: Offer): void {
    if (offer.offerId != null) {
      this.offerService.getOfferPosting(offer.offerId).subscribe(
        response => {
          offer.posting = response;
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Offer posting not found!' })
        }
      );;
    }
  }

  retrieveOffers() {
    if (this.student != null && this.student.studentId != null) {
      this.studentService.getStudentOffers(this.student.studentId).subscribe(
        (response) => {
          response.forEach((offer) => {
            let editedOffer = {
              offerId: offer.offerId,
              offerMessage: offer.offerMessage,
              offerStatus: offer.offerStatus,
              student: this.student,
              posting: undefined
            };
            this.offers.push(editedOffer);
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve offers.',
          });
        }
      );
    }
  }
}
