import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnowComponent } from './snow.component';

@NgModule({
    imports: [CommonModule, SnowComponent],
    exports: [SnowComponent]
})
export class SnowModule {}
