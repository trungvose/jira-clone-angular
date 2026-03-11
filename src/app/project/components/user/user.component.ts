import { Component, Input } from '@angular/core';
import { JUser } from '@trungk18/interface/user';
import { AvatarComponent } from '../../../jira-control/avatar/avatar.component';

@Component({
    selector: 'j-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    standalone: true,
    imports: [AvatarComponent]
})
export class UserComponent {
  @Input() user: JUser;

  constructor() {}
}
