import { Component } from '@angular/core';

import { SessionService } from '../services/session.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  isLogin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public sessionService: SessionService,
    private breakpointObserver: BreakpointObserver
  ) {
    let currentStudent = this.sessionService.getCurrentStudent();
    currentStudent ? this.isLogin = true : this.isLogin = false;
  }

  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  emailEnquiries() {
    location.href = "mailto:perfectMatch_enquiries@gmail.com";
  }

  emailBusiness() {
    location.href = "mailto:perfectMatch_partnerships@gmail.com";
  }

  emailRecruit() {
    location.href = "mailto:perfectMatch_recruitment@gmail.com";
  }
}
