import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkInProgressRoutingModule } from './work-in-progress-routing.module';
import { WorkInProgressComponent } from './work-in-progress.component';


@NgModule({
    imports: [
        CommonModule,
        WorkInProgressRoutingModule,
        WorkInProgressComponent
    ]
})
export class WorkInProgressModule { }
