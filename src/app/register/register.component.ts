import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../services/session.service';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  submitted: boolean;
  newStudent: Student;

  // studentId: number | undefined;
  // name: string | undefined;
  // biography: string | undefined;
  // email: string | undefined;
  // password: string | undefined;
  // educationalInstitute: string | undefined;
  // courseOfStudy: string | undefined;
  // yearOfStudy: number | undefined;
  // projectedGraduationYear: Date | undefined;
  relevantSkills: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  //availabilityPeriod: Date[] | undefined;

  newSkill: string | undefined;
  
  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public sessionService: SessionService,
    private studentService: StudentService) {
    this.submitted = false;
    this.newStudent = new Student();
    this.relevantSkills = new Array();

    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit() { }

  clear() {
    this.submitted = false;
    this.newStudent = new Student();
    this.startDate = undefined;
    this.endDate = undefined;
    this.relevantSkills = new Array();
  }

  addSkill() {
    if (this.newSkill != null) {
      this.relevantSkills.push(this.newSkill);
      this.newSkill = undefined;
    }
  }

  create(createStudentForm: NgForm) {
    this.submitted = true;
    if (this.startDate != null && this.endDate != null && this.newStudent.availabilityPeriod != null) {
        this.newStudent.availabilityPeriod[0] = this.startDate;
        this.newStudent.availabilityPeriod[1] = this.endDate;
      }

    if (createStudentForm.valid) {
      this.studentService.createNewStudent(this.newStudent).subscribe(
        response => {
          let newStudentId: number = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New account of ID " + newStudentId + " created successfully";
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new account: " + error;
        }
      );
    }
  }
}
