import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}

// import { Component, OnInit } from '@angular/core';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';
// import { map, shareReplay } from 'rxjs/operators';

// import { NgForm } from '@angular/forms';

// import { SessionService } from '../services/session.service';
// import { StudentService } from '../services/student.service';
// import { Student } from '../models/student';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })

// export class RegisterComponent {

//     studentId: number | undefined;
//     name: string | undefined;
//     biography: string | undefined;
//     email: string | undefined;
//     password: string | undefined;
//     educationalInstitute: string | undefined;
//     courseOfStudy: string | undefined;
//     yearOfStudy: number | undefined;
//     projectedGraduationYear: Date | undefined;
//     relevantSkills: string[] | undefined;
//     availabilityPeriod: Date[] | undefined;

//     newSkill: string | undefined;
//     newStudent: Student | undefined;

//   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
//     .pipe(
//       map(result => result.matches),
//       shareReplay()
//     );

//   constructor(private breakpointObserver: BreakpointObserver,
//     public sessionService: SessionService,
//     private studentService: StudentService) {}

//     addSkill() {
//       if (this.newSkill != null && this.relevantSkills != null) {
//         this.relevantSkills.push(this.newSkill);
//       }
//     }
// }
