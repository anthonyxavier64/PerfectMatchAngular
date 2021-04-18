import { Component, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MenuItem } from 'primeng/api';
import { StudentWrapper } from '../../models/student-wrapper';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css'],
})
export class ViewprofileComponent {
  items: MenuItem[];
  activeItem: MenuItem;
  currentStudent: StudentWrapper | undefined;
  isLogin: boolean = true;
  startDate: Date | undefined;
  endDate: Date | undefined;
  projectedGraduationYear: Date | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService
  ) {
    this.items = [];
    this.currentStudent = this.sessionService.getCurrentStudent();
    this.activeItem = {};
  }

  ngOnInit() {
    console.log(this.currentStudent)
    if (this.currentStudent) {
      if (this.currentStudent.availabilityPeriod !== undefined) {
        this.startDate = new Date(this.currentStudent.availabilityPeriod[0]);
        this.endDate = new Date(this.currentStudent.availabilityPeriod[1]);
      }

      if (this.currentStudent.projectedGraduationYear !== undefined) {
        this.projectedGraduationYear = new Date(
          this.currentStudent.projectedGraduationYear
        );
      }
    }

    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: (event: any) => {
          this.activeItem = this.items[0];
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (event: any) => {
          this.activeItem = this.items[1];
        },
      },
    ];

    this.activeItem = this.items[0];
  }

  setCurrentStudent(currentStudent: StudentWrapper) {
    this.currentStudent = currentStudent;
  }
}
