import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Profile {
  firstName: string;
  lastName: string;
  age: number
}

export class FormTypedComponent implements OnInit {
  ngOnInit(): void {
    const profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      age: new FormControl(0)
    });
  }
}

