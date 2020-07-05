import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this._fb.group({
      email: ['', NoWhitespaceValidator()],
      fullName: ['', NoWhitespaceValidator()],
      password: ['', NoWhitespaceValidator()]
    });
  }
}
