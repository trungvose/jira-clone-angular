import { Component } from '@angular/core';
import { ContentLoaderModule } from '@ngneat/content-loader';

@Component({
    selector: 'issue-loader',
    templateUrl: './issue-loader.component.html',
    styleUrls: ['./issue-loader.component.scss'],
    standalone: true,
    imports: [ContentLoaderModule]
})
export class IssueLoaderComponent {
  constructor() {}
}
