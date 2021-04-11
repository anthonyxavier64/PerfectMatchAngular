import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ProjectService } from 'src/app/services/project.service';

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
  sortOrder: number;
  sortField: string;
  searchNameString: string = '';
  searchIndustryString: string = '';
  searchSkillsString: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.projects = new Array();
    this.displayedProjects = new Array();
    this.sortOptions = [
      { label: 'High to Low', value: 'HighToLow' },
      { label: 'Low to High', value: 'LowToHigh' },
    ];
    this.sortOrder = -1;
    this.sortField = '';
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (response) => {
        let result: any[] = new Array();

        response.forEach((project) => {
          let earliestStart = undefined;
          let latestStart = undefined;
          if (project.earliestStartDate !== undefined) {
            earliestStart = new Date(project.earliestStartDate);
          }
          if (project.latestStartDate !== undefined) {
            latestStart = new Date(project.latestStartDate);
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

    if (value.indexOf('H') === 0) {
      this.displayedProjects.sort((a, b) =>
        a.pay > b.pay ? -1 : 1
      );
    } else {
      this.displayedProjects.sort((a, b) =>
        a.pay > b.pay ? 1 : -1
      );
    }
  }

  searchNameEvent(event: any) {
    this.displayedProjects = new Array();
    event.data === null
      ? (this.searchNameString = this.searchNameString.substring(
          0,
          this.searchNameString.length - 1
        ))
      : (this.searchNameString += event.data.toLowerCase());
    this.projects.forEach((project) => {
      if (project.projectTitle.toLowerCase().includes(this.searchNameString)) {
        this.displayedProjects.push(project);
      }
    });
  }

  searchIndustryEvent(event: any) {
    this.displayedProjects = new Array();
    event.data === null
      ? (this.searchIndustryString = this.searchIndustryString.substring(
          0,
          this.searchIndustryString.length - 1
        ))
      : (this.searchIndustryString += event.data.toLowerCase());
    this.projects.forEach((project) => {
      if (
        project.industry.toLowerCase().startsWith(this.searchIndustryString)
      ) {
        this.displayedProjects.push(project);
      }
    });
  }

  searchSkillsEvent(event: any) {
    this.displayedProjects = new Array();
    event.data === null
      ? (this.searchSkillsString = this.searchSkillsString.substring(
          0,
          this.searchSkillsString.length - 1
        ))
      : (this.searchSkillsString += event.data.toLowerCase());
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
}
