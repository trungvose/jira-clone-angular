import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@trungk18/core/state/auth/auth.service';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _fb: FormBuilder, private _authService: AuthService) {}

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
    this._authService.login(loginPayload);
  }
}
