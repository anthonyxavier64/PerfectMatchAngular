import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../services/session.service';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit
{
  email: string | undefined;
  password: string | undefined;
  loginError: boolean;
  
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public sessionService: SessionService,
              private studentService: StudentService)
    {
      this.loginError = false;
    }

  ngOnInit(): void
  {
  }


  studentLogin(): void
  {
    let student: Student | null = this.studentService.studentLogin(this.email, this.password);
    
    if(student != null)
    {
      this.sessionService.setIsLogin(true);
      this.sessionService.setCurrentStudent(student);
      this.loginError = false;
      
      this.router.navigate(["/index"]);
    }
    else
    {
      this.loginError = true;
    }
  }
  
  studentLogout(): void
  {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStudent(null);
    
    this.router.navigate(["/index"]);
  }

}