import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class WorkInProgressComponent {
  constructor() {}
}
