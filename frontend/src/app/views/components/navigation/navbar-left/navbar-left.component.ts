import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {
  currentUser$: Observable<any>;
  items: NavItem[];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search issues', () => {

      }),
      new NavItem('plus', 'Create issue', () => {})
    ];
  }
}

class NavItem {
  constructor(public icon: string, public tooltip: string, public handler: Handler) {}
}

interface Handler {
  (): void
}