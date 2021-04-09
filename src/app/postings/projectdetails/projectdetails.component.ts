import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Project } from 'src/app/models/project';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css'],
  providers: [MessageService],
})
export class ProjectdetailsComponent implements OnInit {
  isLogin: boolean = true;
  postingId: string | null;
  project: Project;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.postingId = null;
    this.project = new Project();
  }

  ngOnInit(): void {
    this.postingId = this.activatedRoute.snapshot.paramMap.get('postingId');
    if (this.postingId !== null) {
      this.projectService.getProjectById(parseInt(this.postingId)).subscribe(
        (response) => {
          this.project = response;
          console.log(this.project);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve project.',
          });
          this.router.navigate(['/postings/viewProjects']);
        }
      );
    }
  }
}
