import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Startup } from '../models/startup';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  baseUrl: string = '/api/StartUp';

  constructor(private httpClient: HttpClient) {}

  getStartupById(startupId: number): Observable<Startup> {
    return this.httpClient
      .get<Startup>(this.baseUrl + '/getStartupById/' + startupId)
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
