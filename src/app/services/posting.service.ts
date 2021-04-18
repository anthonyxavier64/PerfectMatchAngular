import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Posting } from '../models/posting';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})

export class PostingService {
  baseUrl: string = '/api/Posting';

  constructor(private httpClient: HttpClient) {}

  getPostings(): Observable<Posting[]> {
    return this.httpClient.get<Posting[]>(this.baseUrl + "/retrieveAllPostings")
    .pipe(catchError(this.handleError));
  }

  getPostingById(postingId: number): Observable<Posting> {
    return this.httpClient.get<Posting>(this.baseUrl + "/retrievePostingById/" + postingId)
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
