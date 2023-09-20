import { Component, OnInit } from '@angular/core';
import { AuthQuery } from '@trungk18/project/auth/auth.query';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { SearchDrawerComponent } from '../../search/search-drawer/search-drawer.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddIssueModalComponent } from '../../add-issue-modal/add-issue-modal.component';
import { ButtonComponent } from '../../../../jira-control/button/button.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AvatarComponent } from '../../../../jira-control/avatar/avatar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-navbar-left',
    templateUrl: './navbar-left.component.html',
    styleUrls: ['./navbar-left.component.scss'],
    standalone: true,
    imports: [NgFor, NzToolTipModule, NzIconModule, NgIf, AvatarComponent, NzPopoverModule, ButtonComponent, AsyncPipe]
})
export class NavbarLeftComponent implements OnInit {
  items: NavItem[];
  constructor(
    public authQuery: AuthQuery,
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
}

class NavItem {
  constructor(public icon: string, public tooltip: string, public handler: Handler) {}
}

type Handler = () => void;
