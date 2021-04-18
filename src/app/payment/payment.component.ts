import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StudentWrapper } from 'src/app/models/student-wrapper';
import { SessionService } from 'src/app/services/session.service';
import { StudentService } from 'src/app/services/student.service';
import { Payment } from '../models/payment';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [MessageService],
})
export class PaymentComponent {
  isLogin: boolean = true;

  payments: Payment[];
  student: StudentWrapper | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.payments = new Array();
  }

  ngOnInit(): void {
    this.student = this.sessionService.getCurrentStudent();
    if (this.student != null && this.student.studentId != null) {
      this.studentService.getStudentPayments(this.student.studentId).subscribe(
        (response) => {
          response.forEach((payment) => {
            let dateOfTransaction = undefined;
            if (payment.dateOfTransaction !== undefined) {
              dateOfTransaction = new Date(payment.dateOfTransaction);
            }
            this.payments.push(payment);
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to retrieve payments.',
          });
        }
      );
    }
  }
}
