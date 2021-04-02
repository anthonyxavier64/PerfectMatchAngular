import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StudentWrapper } from 'src/app/models/student-wrapper';
import { SessionService } from 'src/app/services/session.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers: [MessageService]
})
export class EditprofileComponent implements OnInit {
  @Input() currentStudent: StudentWrapper;
  
  @Output() childEvent = new EventEmitter<StudentWrapper>();

  editStudent: StudentWrapper;
  startDate: string;
  endDate: string;
  newSkill: string | undefined;

  relevantSkills: string[];

  constructor(
    private studentService: StudentService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.currentStudent = new StudentWrapper();
    this.startDate = '';
    this.endDate = '';
    this.relevantSkills = new Array();
    this.editStudent = new StudentWrapper();
  }

  ngOnInit(): void {
    this.editStudent.name = this.currentStudent.name;
    this.editStudent.availabilityPeriod = this.currentStudent.availabilityPeriod;
    this.editStudent.biography = this.currentStudent.biography;
    this.editStudent.courseOfStudy = this.currentStudent.courseOfStudy;
    this.editStudent.educationalInstitute = this.currentStudent.educationalInstitute;
    this.editStudent.email = this.currentStudent.email;
    this.editStudent.password = this.currentStudent.password;
    this.editStudent.projectedGraduationYear = this.currentStudent.projectedGraduationYear;
    this.editStudent.relevantSkills = this.currentStudent.relevantSkills;
    this.editStudent.studentId = this.currentStudent.studentId;
    this.editStudent.yearOfStudy = this.currentStudent.yearOfStudy;

    if (this.currentStudent.availabilityPeriod !== undefined) {
      this.startDate = this.currentStudent.availabilityPeriod[0];
      this.endDate = this.currentStudent.availabilityPeriod[1];
      if (this.currentStudent.relevantSkills) {
        this.relevantSkills = this.currentStudent.relevantSkills;
      }
    }
  }

  edit(ngForm: NgForm) {
    if (this.editStudent) {
      this.editStudent.relevantSkills = this.relevantSkills;

      if (this.editStudent.availabilityPeriod) {
        this.editStudent.availabilityPeriod[0] = this.startDate;
        this.editStudent.availabilityPeriod[1] = this.endDate;
      }
    }

    this.studentService.editStudentDetails(this.editStudent).subscribe(
      (response) => {
        this.sessionService.setCurrentStudent(response);
        this.messageService.add({
          severity:'success', summary: 'Account edited succesfully!'
        });
        this.childEvent.emit(response);
        this.router.navigate(["/viewProfile"]);
      },
      (error) => {
        this.messageService.add({
          severity:'error', summary:"Error", detail:'Unable to edit account'
        });
      }
    );
  }

  addSkill() {
    if (this.newSkill != undefined) {
      this.relevantSkills.push(this.newSkill);
      this.newSkill = undefined;
    }
  }
}
