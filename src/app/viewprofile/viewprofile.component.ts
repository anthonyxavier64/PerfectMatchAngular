import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { StudentWrapper } from '../models/student-wrapper';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css'],
})
export class ViewprofileComponent {
  items: MenuItem[];
  activeItem: MenuItem | undefined;
  activatedItem: string = 'profile';
  currentStudent: StudentWrapper;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.items = [];
    this.currentStudent = sessionService.getCurrentStudent();
  }

  ngOnInit() {
    (this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: (event: any) => {
          this.activatedItem = event.item.label;
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (event: any) => {
          this.activatedItem = event.item.label;
        },
      },
    ]),
      (this.activeItem = this.items[0]);
  }

}
