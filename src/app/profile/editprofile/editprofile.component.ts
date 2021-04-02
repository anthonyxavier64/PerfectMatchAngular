import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentWrapper } from 'src/app/models/student-wrapper';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  @Input() currentStudent: StudentWrapper;
  startDate: string;
  endDate: string;
  newSkill: string | undefined;

  relevantSkills: string[];

  constructor() {
    this.currentStudent = new StudentWrapper();
    this.startDate = '';
    this.endDate = '';
    this.relevantSkills = new Array();
  }

  ngOnInit(): void {
    if (this.currentStudent.availabilityPeriod !== undefined) {
      this.startDate = this.currentStudent.availabilityPeriod[0];
      this.endDate = this.currentStudent.availabilityPeriod[1];
      if (this.currentStudent.relevantSkills) {
        this.relevantSkills = this.currentStudent.relevantSkills;
      }
    }
  }

  edit(ngForm: NgForm) { 

  }

  addSkill() {
    if (this.newSkill != undefined) {
      this.relevantSkills.push(this.newSkill);
      this.newSkill = undefined;
    }
  }
}
