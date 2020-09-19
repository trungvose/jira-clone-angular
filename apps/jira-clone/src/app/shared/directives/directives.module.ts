import { NgModule } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';

const directives = [AutofocusDirective];
@NgModule({
  imports: [],
  exports: [...directives],
  declarations: [...directives],
})
export class JiraDirectivesModule {}
