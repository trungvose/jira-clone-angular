import { Component, OnInit } from '@angular/core';
import { AuthQuery } from '@trungk18/project/auth/auth.query';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {
  items: NavItem[];
  constructor(public authQuery: AuthQuery) {}

  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search issues', () => {}),
      new NavItem('plus', 'Create issue', () => {})
    ];
  }
}

class NavItem {
  constructor(public icon: string, public tooltip: string, public handler: Handler) {}
}

interface Handler {
  (): void;
}
