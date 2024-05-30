import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'line-text-field',
  template: `
    <div class="line-text-field-container">
<!--      <label for="lineTextField" class="field-label">{{ fieldName }}</label>-->
      <input type="text" class="line-text-field" id="lineTextField" [(ngModel)]="text" [type]="type" (ngModelChange)="onTextChange($event)">
    </div>
  `,
  styles: [`
    .line-text-field-container {
      display: flex;
      flex-direction: column;
    }

    .line-text-field {
      font-family: 'Jura', sans-serif;
      background: transparent;
      border: none;
      border-bottom: 1px solid #808080; /* Gray bottom border */
      -webkit-box-shadow: none;
      box-shadow: none;
      border-radius: 0; /* No rounded corners for the bottom line style */
      color: #808080; /* Gray text color */
      padding: 10px 0; /* Padding top and bottom without side paddings */
    }

    .line-text-field:focus {
      outline: none; /* Removes the default focus outline */
      border-bottom-color: #A9A9A9; /* Optionally change border color on focus to a different shade of gray */
    }
  `]
})
export class LineTextField {
  @Input() text: String = "";
  @Input() fieldName: String = ""; // This is the input for the field label
  @Input() type: String = "";
  @Output() textChange = new EventEmitter<string>();

  onTextChange(value: string) {
    this.textChange.emit(value);
  }
}

@NgModule({
  declarations: [LineTextField],
  imports: [CommonModule, FormsModule],
  exports: [LineTextField],
})
export class LineTextFieldModule {}
