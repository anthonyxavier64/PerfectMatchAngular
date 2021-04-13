import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Application } from 'src/app/models/application';
import { StudentService } from 'src/app/services/student.service';
import { SessionService } from 'src/app/services/session.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-viewallapplications',
  templateUrl: './viewallapplications.component.html',
  styleUrls: ['./viewallapplications.component.css'],
  providers: [MessageService],
})
export class ViewallapplicationsComponent {
  isLogin: boolean = true;
  applications: any[];
  isLoading: boolean = true;
  sortOptions: [{}, {}];
  statusOptions: [{}, {}, {}];
  displayedApplications: Application[];
  searchNameString: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private studentService: StudentService,
    private sessionService: SessionService,
    private messageService: MessageService
  ) {
    this.applications = new Array();
    this.displayedApplications = new Array();
    this.sortOptions = [
      { label: 'Projects', value: 'Projects' },
      { label: 'Jobs', value: 'Job' },
    ];
    this.statusOptions = [
      { label: 'PENDING', value: 'PENDING' },
      { label: 'ACCEPTED', value: 'ACCEPTED' },
      { label: 'REJECTED', value: 'REJECTED' },
    ];
  }

  ngOnInit(): void {
    let studentId: number | undefined = this.sessionService.getCurrentStudent()
      ?.studentId;

    if (studentId !== undefined) {
      this.studentService.getStudentApplications(studentId).subscribe(
        (response) => {
          this.applications = response;
          this.displayedApplications = response;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve applications.',
          });
        }
      );
      this.isLoading = false;
    }
  }

  onSortChange(event: any) {
    let value = event.value;

    this.displayedApplications = new Array();

    if (value.indexOf('P') === 0) {
      this.applications.forEach((app) => {
        if (app.posting.isProject) {
          this.displayedApplications.push(app);
        }
      });
    } else {
      this.applications.forEach((app) => {
        if (!app.posting.isProject) {
          this.displayedApplications.push(app);
        }
      });
    }
  }

  onStatusChange(event: any) {
    let value = event.value;

    this.displayedApplications = new Array();

    if (value.indexOf('A') === 0) {
      this.applications.forEach((app) => {
        if (app.applicationStatus === 'ACCEPTED') {
          this.displayedApplications.push(app);
        }
      });
    } else if (value.indexOf('P') === 0) {
      this.applications.forEach((app) => {
        if (app.applicationStatus === 'PENDING') {
          this.displayedApplications.push(app);
        }
      });
    } else {
      this.applications.forEach((app) => {
        if (app.applicationStatus === 'REJECTED') {
          this.displayedApplications.push(app);
        }
      });
    }
  }

  searchApplicationName(event: any) {
    this.displayedApplications = new Array();
    event.data === null
      ? (this.searchNameString = this.searchNameString.substring(
          0,
          this.searchNameString.length - 1
        ))
      : (this.searchNameString += event.data.toLowerCase());
    this.applications.forEach((app) => {
      if (app.posting.title.toLowerCase().includes(this.searchNameString)) {
        this.displayedApplications.push(app);
      }
    });
  }
}
