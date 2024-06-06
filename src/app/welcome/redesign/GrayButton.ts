import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gray-button',
  template: `
    <button type="button" class="btn-custom">{{ buttonName }}</button>
  `,
  styles: [`
    .btn-custom {
      font-family: 'Jura', sans-serif;
      width: 100%;
      background-color: var(--banka-gray); /* Use your specific gray color */
      color: var(--banka-white); /* Black text color */
      border: 1px solid #000; /* Thin black border */
      padding: 10px 20px; /* Adjust padding to your preference */
      font-size: 18px; /* Adjust font size to your preference */
      border-radius: 5px; /* Rounded corners */
      cursor: pointer;
      margin-bottom: 10px;
      transition: background-color 0.3s, transform 0.3s; /* Smooth transition for hover effects */
    }

    .btn-custom:hover {
      background-color: var(--banka-light-gray); /* Slightly darken the button on hover for feedback */
      /*transform: scale(1.05); !* Slightly enlarge the button on hover *!*/
    }
  `]
})
export class GrayButton {
  @Input()
  get buttonName(): string { return this._name; }
  set buttonName(name: string) {this._name = (name && name.trim()) || '<no name set>';}
  private _name = '';
}

@NgModule({
  declarations: [GrayButton],
  imports: [CommonModule],
  exports: [GrayButton],
})
export class GrayButtonModule {}
