import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'transparent-text-field',
  template: `
    <div class="text-field-container">
      <label for="name" class="field-label">{{ fieldName }}</label>
      <input [type]="p?'password':'text'" name="name" class="form-control" id="name" [(ngModel)]="text" [type]="type" (ngModelChange)="onTextChange($event)">
    </div>
  `,
  styles: [`
    .text-field-container {
      display: flex;
      flex-direction: column;
      margin-left: 8%;
      margin-right: 8%;
    }

    .field-label {
      margin-bottom: 2px; /* Adjust based on your design */
      color: #FFFFFF; /* Label color */
      font-family: 'Jura', sans-serif;
    }

    input[type="text"],
    .form-control {
      font-family: 'Jura', sans-serif;
      background: transparent;
      border: 2px solid #FFFFFF; /* White border */
      -webkit-box-shadow: none;
      box-shadow: none;
      border-radius: 5px; /* Rounded corners, adjust as needed */
      color: #FFFFFF; /* Text color */
      /* Adjust padding to your preference */

    }

    input[type="text"]:focus,
    .form-control:focus {
      outline: none; /* Removes the default focus outline */
      border-color: #CCCCCC; /* Optional: Changes border color on focus */
    }


  `]
})
export class TransparentTextField {
  @Input() text: String = "";
  @Input() fieldName: String = "No name"; // This is the input for the field label
  @Input() type: String = "";
  @Output() textChange = new EventEmitter<string>();
  @Input() p: boolean = false;

  onTextChange(value: string) {
    this.textChange.emit(value);
  }
}

@NgModule({
  declarations: [TransparentTextField],
  imports: [CommonModule, FormsModule],
  exports: [TransparentTextField],
})
export class TransparentTextFieldModule {}
