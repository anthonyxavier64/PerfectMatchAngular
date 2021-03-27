import { Injectable } from '@angular/core';

import { SessionService } from '../services/session.service';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[];
  currentStudent: Student | null;

  constructor(private sessionService: SessionService) {
    this.currentStudent = sessionService.getCurrentStudent();
    // Need to retrieve list of students from database
    this.students = new Array();
    if (this.students == null) {
      let student: Student;
      student = new Student();
      this.students = new Array();
    }
  }

  getStudents() {
    return this.students;
  }

  createNewStudent(newStudent: Student) {
    if (this.students != null) {
      let s: Student = new Student();
      s.availabilityPeriod = newStudent.availabilityPeriod;
      s.biography = newStudent.biography;
      s.courseOfStudy = newStudent.courseOfStudy;
      s.educationalInstitute = newStudent.educationalInstitute;
      s.email = newStudent.email;
      s.password = newStudent.password;
      s.name = newStudent.name;
      s.projectedGraduationYear = newStudent.projectedGraduationYear;
      s.relevantSkills = newStudent.relevantSkills;
      s.studentId = newStudent.studentId;
      s.yearOfStudy = newStudent.yearOfStudy;

      this.students.push(s);
    }
  }

    studentLogin(email: string | undefined, password: string | undefined): Student | null {
      for (let student of this.getStudents()) {
        if (student.email == email && student.password == password) {
          this.currentStudent = student;
          this.sessionService.setCurrentStudent(student);
          this.sessionService.setIsLogin(true);
          return student;
        }
      }
      return null;
    }
  }
