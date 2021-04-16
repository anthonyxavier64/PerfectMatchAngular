import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StudentWrapper } from '../models/student-wrapper';
import { Offer } from '../models/offer';
import { Application } from '../models/application';
import { Startup } from '../models/startup';
import { Posting } from '../models/posting';
import { Favourites } from '../models/favourites';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl: string = '/api/Student';

  constructor(
    private httpClient: HttpClient
  ) { }

  studentLogin(
    email: string | undefined,
    password: string | undefined
  ): Observable<StudentWrapper> {
    return this.httpClient
      .get<StudentWrapper>(
        this.baseUrl + '/studentLogin?email=' + email + '&password=' + password
      )
      .pipe(catchError(this.handleError));
  }

  createNewStudent(newStudent: StudentWrapper): Observable<StudentWrapper> {
    return this.httpClient
      .put<StudentWrapper>(this.baseUrl + "/registerStudentAccount", newStudent, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editStudentDetails(student: StudentWrapper): Observable<StudentWrapper> {
    return this.httpClient
      .put<StudentWrapper>(this.baseUrl + "/editStudentDetails", student, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getStudentOffers(studentId: number): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.baseUrl + "/getStudentOffers/" + studentId)
      .pipe(catchError(this.handleError));
  }

  getStudentApplications(studentId: number): Observable<Application[]> {
    return this.httpClient.get<Application[]>(this.baseUrl + "/getApplicationsByStudentId/" + studentId)
      .pipe(catchError(this.handleError));
  }

  getStudentFavorites(studentId: number): Observable<Favourites[]> {
    return this.httpClient.get<Favourites[]>(this.baseUrl + "/getFavoritesByStudentId/" + studentId)
      .pipe(catchError(this.handleError));
  }

  addFavourite(favourite: Favourites): Observable<StudentWrapper> {
    return this.httpClient.get<StudentWrapper>(this.baseUrl + "/addFavourite?studId=" + favourite.studentId + "&postId=" + favourite.postingId)
    .pipe(catchError(this.handleError));
  }

  removeFavourite(favourite: Favourites): Observable<StudentWrapper> { 
    return this.httpClient.get<StudentWrapper>(this.baseUrl + "/removeFavourite?studId=" + favourite.studentId + "&postId=" + favourite.postingId)
    .pipe(catchError(this.handleError));
  }

  getStudentWork(studentId: number): Observable<Posting[]> {
    return this.httpClient.get<Posting[]>(this.baseUrl + "/getStudentPostings/" + studentId)
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
