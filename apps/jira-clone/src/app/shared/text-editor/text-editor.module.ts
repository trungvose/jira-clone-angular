import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TEXT_EDITOR_ICONS } from './icons';
import { TextEditorComponent } from './text-editor.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { JiraDirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldModule,
    JiraDirectivesModule,
    NzIconModule.forChild(TEXT_EDITOR_ICONS),
  ],
  exports: [TextEditorComponent],
  declarations: [TextEditorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JiraTextEditorModule {}
