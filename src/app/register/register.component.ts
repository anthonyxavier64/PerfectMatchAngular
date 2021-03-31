import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../services/session.service';
import { StudentService } from '../services/student.service';
import { StudentWrapper } from '../models/student-wrapper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  submitted: boolean;
  newStudent: StudentWrapper;
  relevantSkills: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  projectedGraduationYear: Date | undefined;

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
    this.newStudent = new StudentWrapper();
    this.relevantSkills = new Array();

    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit() { }

  clear() {
    this.submitted = false;
    this.newStudent = new StudentWrapper();
  }

  addSkill() {
    if (this.newSkill != null && this.newStudent != null && this.newStudent.relevantSkills != null) {
      this.relevantSkills.push(this.newSkill);
    }
  }

  create(createStudentForm: NgForm) {
    this.submitted = true;

    let convertGraduationYear = this.projectedGraduationYear?.toString();
    this.newStudent.projectedGraduationYear = convertGraduationYear;

    if (this.startDate != null && this.endDate != null && this.newStudent.availabilityPeriod != null) {
      let convertStartDate = this.startDate?.toString();
      let convertEndDate = this.endDate?.toString();
      this.newStudent.availabilityPeriod[0] = convertStartDate;
      this.newStudent.availabilityPeriod[1] = convertEndDate;
    }

    if (createStudentForm.valid) {
      this.studentService.createNewStudent(this.newStudent).subscribe(
        response => {
          let newStudentId: StudentWrapper = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New account of ID " + newStudentId + " created successfully";
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new account: " + error;

          console.log('********** CreateNewStudentComponent.ts: ' + error);
        }
      );
    }
  }
}
