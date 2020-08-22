import { Component, OnInit, Input } from '@angular/core';
import { UserDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'j-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: UserDto;

  constructor() {}

  ngOnInit(): void {}
}
