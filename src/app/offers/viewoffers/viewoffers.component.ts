import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Offer } from 'src/app/models/offer';
import { Posting } from 'src/app/models/posting';
import { OfferService } from 'src/app/services/offer.service';
import { SessionService } from 'src/app/services/session.service';

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
  posting: Posting | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private offerService: OfferService,
    private messageService: MessageService) {
    this.offers = new Array();
  }

  ngOnInit(): void {
    this.offerService.getOffers().subscribe(
      (response) => {
        let result: any[] = new Array();

        response.forEach((offer) => {
          let editedOffer = {
            offerId: offer.offerId,
            offerMessage: offer.offerMessage,
            offerStatus: offer.offerStatus,
            student: offer.student,
            posting: offer.posting
          };
          this.offers.push(editedOffer);
        });
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
}
