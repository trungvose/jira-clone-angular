import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnowComponent } from './snow.component';

@NgModule({
  declarations: [SnowComponent],
  imports: [CommonModule],
  exports: [SnowComponent]
})
export class SnowModule {}
