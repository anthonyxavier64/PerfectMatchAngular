import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StudentWrapper } from 'src/app/models/student-wrapper';
import { Startup } from 'src/app/models/startup';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';
import { StudentService } from 'src/app/services/student.service';
import { Posting } from 'src/app/models/posting';
import { Job } from 'src/app/models/job';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-view-all-favorites',
  templateUrl: './view-all-favorites.component.html',
  styleUrls: ['./view-all-favorites.component.css'],
  providers: [MessageService],
})

export class ViewAllFavoritesComponent {
  isLoading: boolean = true;

  isLogin: boolean = true;
  student: StudentWrapper | undefined;
  favorites: Posting[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Output()
  childEvent = new EventEmitter<boolean>();

  constructor(private breakpointObserver: BreakpointObserver,
    private studentService: StudentService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private router: Router) {
    this.student = this.sessionService.getCurrentStudent();
    this.favorites = new Array();
  }

  ngOnInit(): void {
    if (this.student != null && this.student.studentId != null)
      this.studentService.getStudentFavorites(this.student.studentId).subscribe(
        (response) => {
          this.favorites = response;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve favorites',
          });
        }
      );
  }

  isProject(posting: Posting) : boolean {
    if (posting instanceof Project) {
      return true;
    }
    return false;
  }

  removePostingFromFavorites(posting: Posting) {
    let index: number = -1;
    if (posting != null && this.student != null) {
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i] == posting) {
          index = i;
        }
      }
      this.favorites.splice(index, 1);
      this.student.favorites = this.favorites;

      this.studentService.editStudentDetails(this.student).subscribe(
        (response) => {
          this.sessionService.setCurrentStudent(response);
          this.messageService.add({
            severity: 'success',
            summary: 'posting removed from favorites!',
          });
          this.childEvent.emit(true);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to remove from favorites',
          });
        }
      );
    }
  }

  viewPostingDetails(posting: Posting) {
    if (posting instanceof Job) {
      this.router.navigate(['postings/viewJobDetails/' + posting.postingId]);
    } else {
      this.router.navigate(['postings/viewProjectDetails/' + posting.postingId]);
    }
  }
}
