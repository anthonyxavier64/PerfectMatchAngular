import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { SessionService } from '../services/session.service';
import { StudentService } from '../services/student.service';
import { StudentWrapper } from '../models/student-wrapper';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})

export class LoginformComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  @Output() 
  childEvent = new EventEmitter();
  
  email: string | undefined;
  password: string | undefined;
  loginError: boolean;
  errorMessage: string | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private studentService: StudentService) {
    this.loginError = false;
  }

  ngOnInit(): void {
  }


  studentLogin(): void {
    this.studentService.studentLogin(this.email, this.password).subscribe(

      response => {
        let student: StudentWrapper = response;
        if (student != null) {
          this.sessionService.setIsLogin(true);
          this.sessionService.setCurrentStudent(student);
          this.loginError = false;

          this.childEvent.emit();

          this.router.navigate(["/index"]);
        }
        else {
          this.loginError = true;
        }
      },
      error => {
        this.loginError = true;
        this.errorMessage = error
      }
    );
  }

  studentLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStudent(null);

    this.router.navigate(["/index"]);
  }

}