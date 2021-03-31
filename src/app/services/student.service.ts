import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { Student } from '../models/student';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl: string = "/api/Student";

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService) { }

  studentLogin(email: string | undefined, password: string | undefined): Observable<Student> {
    return this.httpClient.get<Student>(this.baseUrl + "/studentLogin?email=" + email + "&password=" + password).pipe
      (
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }

  createNewStudent(newStudent: Student): Observable<number> {

    return this.httpClient.put<number>(this.baseUrl, newStudent, httpOptions).pipe
      (
        catchError(this.handleError)
      );
  }
}