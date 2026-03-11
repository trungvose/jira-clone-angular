import { Component, Input } from '@angular/core';


@Component({
    selector: 'breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    standalone: true,
    imports: []
})
export class BreadcrumbsComponent {
  @Input() items: string[] = [];
  constructor() {}

}
