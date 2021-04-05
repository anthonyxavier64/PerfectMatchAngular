import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Job } from '../models/job';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class JobService {
  baseUrl: string = '/api/Job';

  constructor(private httpClient: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.baseUrl + "/retrieveAllJobs")
    .pipe(catchError(this.handleError));
  }

  getJobById(jobId: number): Observable<Job> {
    return this.httpClient.get<Job>(this.baseUrl + "/retrieveJobById/" + jobId)
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
