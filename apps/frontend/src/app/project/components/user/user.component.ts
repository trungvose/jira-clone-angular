import { Component, Input } from '@angular/core';
import { JUser } from '@trunk18/interface';

@Component({
  selector: 'j-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: JUser;

  constructor() {}
}
