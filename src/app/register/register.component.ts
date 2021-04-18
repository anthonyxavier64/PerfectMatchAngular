import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SessionService } from '../services/session.service';
import { StudentService } from '../services/student.service';
import { StudentWrapper } from '../models/student-wrapper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})

export class RegisterComponent implements OnInit {

  submitted: boolean;
  newStudent: StudentWrapper;
  relevantSkills: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  projectedGraduationYear: Date | undefined;

  newSkill: string | undefined;
  educationInstituteOptions: [] | null;
  currentYearOfStudy: [] | null;

  resultSuccess: boolean;
  resultError: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    public sessionService: SessionService,
    private studentService: StudentService,
    private messageService: MessageService) {
    this.submitted = false;
    this.newStudent = new StudentWrapper();
    this.relevantSkills = new Array();
    this.educationInstituteOptions = null;
    this.currentYearOfStudy = null;

    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit() { }

  clear() {
    this.submitted = false;
    this.newStudent = new StudentWrapper();
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

  removeSkill(skillitem: String) {
    let index: number = -1;
    for (let i = 0; i < this.relevantSkills.length; i++) {
      if (this.relevantSkills[i] == skillitem) {
        index = i;
      }
    }
    this.relevantSkills.splice(index, 1);
  }

  create(createStudentForm: NgForm) {
    this.submitted = true;

    this.newStudent.relevantSkills = this.relevantSkills;

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
          let newStudent: StudentWrapper = response;

          this.resultSuccess = true;
          this.resultError = false;
          this.messageService.add({
            severity: 'success', summary: "New account with ID " + newStudent.studentId + " created successfully"
          });
          this.router.navigate(["/index"]);
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.messageService.add({
            severity: 'error', summary: "Error", detail: 'Unable to create account, please try again with different credentials.'
          })
        }
      );
    }
  }
}
