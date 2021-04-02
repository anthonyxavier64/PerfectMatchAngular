import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StudentWrapper } from '../models/student-wrapper';

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
  ) {}

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
