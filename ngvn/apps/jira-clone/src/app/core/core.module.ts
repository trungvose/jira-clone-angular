import { NgModule } from '@angular/core';
import { AutofocusDirective } from './directives/autofocus.directive';

const directives = [AutofocusDirective];
@NgModule({
  imports: [],
  exports: [...directives],
  declarations: [...directives]
})
export class JiraCoreModule {}
