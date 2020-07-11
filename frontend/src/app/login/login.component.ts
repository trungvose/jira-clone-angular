import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JiraRoutingConst } from '@trungk18/core/utils/jira-routing.const';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '@trungk18/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@UntilDestroy()
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this._fb.group({
      email: ['', [NoWhitespaceValidator(), Validators.email]],
      password: ['', NoWhitespaceValidator()]
    });
  }

  submitForm() {
    let loginPayload = this.loginForm.getRawValue();
    this._authService
      .login(loginPayload)
      .pipe(
        untilDestroyed(this),
        catchError((err) => {
          this._notification.error(
            'Login Failed',
            'Your entered email address or password is incorrect. Please try again '
          );
          return throwError(err);
        })
      )
      .subscribe(() => {
        this._router.navigate([`/${JiraRoutingConst.Projects}`, JiraRoutingConst.MockProjectSlug]);
      });
  }
}
