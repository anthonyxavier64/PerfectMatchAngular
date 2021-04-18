import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Startup } from 'src/app/models/startup';
import { ActivatedRoute } from '@angular/router';
import { StartupService } from 'src/app/services/startup.service';

@Component({
  selector: 'app-viewstartupdetails',
  templateUrl: './viewstartupdetails.component.html',
  styleUrls: ['./viewstartupdetails.component.css'],
  providers: [MessageService],
})
export class ViewstartupdetailsComponent {
  isLogin: boolean = true;
  startup: Startup;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private startupService: StartupService
  ) {
    this.startup = new Startup();
  }

  ngOnInit(): void {
    let startupId = this.activatedRoute.snapshot.paramMap.get('startupId');
    if (startupId !== null) {
      this.startupService.getStartupById(parseInt(startupId)).subscribe(
        (response) => {
          console.log(response)
          this.startup = response;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve startup',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unable to retrieve startup',
      });
    }
  }
}
