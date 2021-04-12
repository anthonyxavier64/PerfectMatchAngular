import {
  HttpClient,
  HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Offer } from '../models/offer';
import { SessionService } from './session.service';

import { Posting } from '../models/posting';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  baseUrl: string = "/api/Offer";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) {
  }

  getOffers(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.baseUrl + "/retrieveAllOffers")
    .pipe(catchError(this.handleError));
  }

  getOfferById(offerId: number): Observable<Offer> {
    return this.httpClient.get<Offer>(this.baseUrl + "/retrieveOfferById/" + offerId)
    .pipe(catchError(this.handleError));
  }

  getOfferPosting(offerId: number): Observable<Posting> {
    return this.httpClient.get<Posting>(this.baseUrl + "/getOfferPosting/" + offerId)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
