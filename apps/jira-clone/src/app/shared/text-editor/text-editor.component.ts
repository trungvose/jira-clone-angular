import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import '@github/markdown-toolbar-element'

@Component({
  selector: 'j-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
  @Input() control: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
  }
}
