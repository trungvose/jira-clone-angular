import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { SearchDrawerComponent } from '../../search/search-drawer/search-drawer.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddIssueModalComponent } from '../../add-issue-modal/add-issue-modal.component';
import { AuthQuery } from '@trungk18/core/auth/auth.query';
import { AuthService } from '@trungk18/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {
  items: NavItem[];
  constructor(
    public authQuery: AuthQuery,
    private _router: Router,
    private _authService: AuthService,
    private _drawerService: NzDrawerService,
    private _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search issues', this.openSearchDrawler.bind(this)),
      new NavItem('plus', 'Create issue', this.openCreateIssueModal.bind(this))
    ];
  }

  openCreateIssueModal() {
    this._modalService.create({
      nzContent: AddIssueModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700
    });
  }

  openSearchDrawler() {
    this._drawerService.create({
      nzContent: SearchDrawerComponent,
      nzTitle: null,
      nzPlacement: 'left',
      nzClosable: false,
      nzWidth: 500
    });
  }

  logout() {
    this._authService.logout().subscribe(() => {
      this._router.navigate(['/login']);
    });
  }
}

class NavItem {
  constructor(public icon: string, public tooltip: string, public handler: Handler) {}
}

interface Handler {
  (): void;
}
