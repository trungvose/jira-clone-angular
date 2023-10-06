import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf]
})
export class BreadcrumbsComponent {
  @Input() items: string[] = [];
  constructor() {}

}
