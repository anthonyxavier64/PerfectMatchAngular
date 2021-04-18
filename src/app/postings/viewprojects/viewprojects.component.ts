import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Favourites } from 'src/app/models/favourites';
import { SessionService } from 'src/app/services/session.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentWrapper } from 'src/app/models/student-wrapper';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-viewprojects',
  templateUrl: './viewprojects.component.html',
  styleUrls: ['./viewprojects.component.css'],
  providers: [MessageService],
})
export class ViewprojectsComponent implements OnInit {
  projects: any[];
  displayedProjects: any[];
  isLogin: boolean = true;
  isLoading: boolean = true;
  sortOptions: [{}, {}];
  areaOptions: [{}, {}, {}, {}, {}];
  sortField: string;
  searchNameString: string = '';
  searchIndustryString: string = '';
  searchSkillsString: string = '';
  bookmarkIds: number[];
  student: StudentWrapper | undefined;
  selectedOption: string | null;
  areaOptionSelect: string | null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Output()
  childEvent = new EventEmitter<StudentWrapper>();

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.projects = new Array();
    this.displayedProjects = new Array();
    this.selectedOption = null;
    this.areaOptionSelect = null;
    this.sortOptions = [
      { label: 'High to Low', value: 'HighToLow' },
      { label: 'Low to High', value: 'LowToHigh' },
    ];
    this.areaOptions = [
      { label: 'North', value: 'NORTH' },
      { label: 'East', value: 'EAST' },
      { label: 'South', value: 'SOUTH' },
      { label: 'West', value: 'WEST' },
      { label: 'Central', value: 'CENTRAL' },
    ];
    this.sortField = '';
    this.bookmarkIds = new Array();
  }

  ngOnInit(): void {
    this.student = this.sessionService.getCurrentStudent();

    if (this.student !== undefined) {
      for (let fav of this.student?.favorites) {
        if (fav.post?.postingId !== undefined) {
          this.bookmarkIds.push(fav.post.postingId);
        }
      }
    }

    this.projectService.getProjects().subscribe(
      (response) => {
        response.forEach((project) => {
          let earliestStart = undefined;
          let latestStart = undefined;
          if (project.earliestStartDate !== undefined) {
            earliestStart = new Date(project.earliestStartDate);
          }
          if (project.latestStartDate !== undefined) {
            latestStart = new Date(project.latestStartDate);
          }

          let isBookmarked: boolean = false;

          if (project.postingId !== undefined) {
            if (this.bookmarkIds.includes(project.postingId)) {
              isBookmarked = true;
            }
          }

          let editedProject = {
            postingId: project.postingId,
            title: project.title,
            description: project.description,
            pay: project.pay,
            earliestStartDate: earliestStart,
            latestStartDate: latestStart,
            industry: project.industry,
            requiredSkills: project.requiredSkills,
            projectSpecialisation: project.projectSpecialisation,
            isComplete: project.isComplete,
            startup: project.startup,
            isBookmarked: isBookmarked,
          };
          this.projects.push(editedProject);
          this.displayedProjects.push(editedProject);
        });
        this.isLoading = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to retrieve projects.',
        });
      }
    );
  }

  onSortChange(event: any) {
    let value = event.value;
    
    this.areaOptionSelect = null;
    this.searchNameString = '';
    this.searchIndustryString = '';
    this.searchSkillsString = '';

    this.displayedProjects = this.projects;

    if (value.indexOf('H') === 0) {
      this.displayedProjects.sort((a, b) => (a.pay > b.pay ? -1 : 1));
    } else {
      this.displayedProjects.sort((a, b) => (a.pay > b.pay ? 1 : -1));
    }
  }

  searchNameEvent(event: any) {
    this.areaOptionSelect = null;
    this.selectedOption = null;
    this.searchIndustryString = '';
    this.searchSkillsString = '';

    this.displayedProjects = new Array();
    
    this.projects.forEach((project) => {
      if (project.title.toLowerCase().includes(this.searchNameString)) {
        this.displayedProjects.push(project);
      }
    });
  }

  onAreaChange(event: any) {
    let value = event.value;

    this.selectedOption = null;
    this.searchNameString = '';
    this.searchIndustryString = '';
    this.searchSkillsString = '';

    this.displayedProjects = new Array();

    if (value.indexOf('N') == 0) {
      this.projects.forEach((project) => {
        if (project.startup.startupLocation === 'NORTH') {
          this.displayedProjects.push(project);
        }
      });
    } else if (value.indexOf('E') == 0) {
      this.projects.forEach((project) => {
        if (project.startup.startupLocation === 'EAST') {
          this.displayedProjects.push(project);
        }
      });
    } else if (value.indexOf('S') == 0) {
      this.projects.forEach((project) => {
        if (project.startup.startupLocation === 'SOUTH') {
          this.displayedProjects.push(project);
        }
      });
    } else if (value.indexOf('C') == 0) {
      this.projects.forEach((project) => {
        if (project.startup.startupLocation === 'CENTRAL') {
          this.displayedProjects.push(project);
        }
      });
    } else {
      this.projects.forEach((project) => {
        if (project.startup.startupLocation === 'WEST') {
          this.displayedProjects.push(project);
        }
      });
    }
  }

  searchIndustryEvent(event: any) {
    this.areaOptionSelect = null;
    this.selectedOption = null;
    this.searchNameString = '';
    this.searchSkillsString = '';

    this.displayedProjects = new Array();
    
    this.projects.forEach((project) => {
      if (
        project.industry.toLowerCase().startsWith(this.searchIndustryString)
      ) {
        this.displayedProjects.push(project);
      }
    });
  }

  searchSkillsEvent(event: any) {
    this.areaOptionSelect = null;
    this.selectedOption = null;
    this.searchNameString = '';
    this.searchIndustryString = '';

    this.displayedProjects = new Array();
    
    this.projects.forEach((project) => {
      let requiredSkills: string[] = project.requiredSkills;

      if (requiredSkills !== undefined) {
        for (let skill of requiredSkills) {
          if (skill.toLowerCase().startsWith(this.searchSkillsString)) {
            this.displayedProjects.push(project);
            break;
          }
        }
      }
    });
  }

  compare(first: number, second: number): number {
    if (first < second) {
      return -1;
    } else if (first > second) {
      return 1;
    }
    return 0;
  }

  addToFavorites(project: Project) {
    if (this.student != null) {
      let newFav: Favourites = new Favourites();
      newFav.postingId = project.postingId;
      newFav.studentId = this.student.studentId;
      if (project.postingId !== undefined) {
        this.bookmarkIds.push(project.postingId);
      }
      this.studentService.addFavourite(newFav).subscribe(
        (response) => {
          this.sessionService.setCurrentStudent(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Project added to favorites!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to add to favourites',
          });
        }
      );
    }
  }

  removeFromFavourites(project: Project) {
    if (this.student !== undefined) {
      let newFav: Favourites = new Favourites();
      newFav.postingId = project.postingId;
      newFav.studentId = this.student.studentId;
      let index: number = -1;
      for (let i = 0; i < this.bookmarkIds.length; i++) {
        if (this.bookmarkIds[i] == project.postingId) {
          index = i;
        }
      }
      this.bookmarkIds.splice(index, 1);
      this.studentService.removeFavourite(newFav).subscribe(
        (response) => {
          this.sessionService.setCurrentStudent(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Project removed from favorites!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to remove from favourites',
          });
        }
      );
    }
  }
  bookmarked(job: any): boolean {
    if (this.student !== undefined) {
      if (this.bookmarkIds?.includes(job.postingId)) {
        return true;
      }
    }
    return false;
  }

  reset() {
    this.displayedProjects = this.projects;
    this.areaOptionSelect = null;
    this.selectedOption = null;
    this.searchNameString = '';
    this.searchIndustryString = '';
    this.searchSkillsString = '';
  }
}
