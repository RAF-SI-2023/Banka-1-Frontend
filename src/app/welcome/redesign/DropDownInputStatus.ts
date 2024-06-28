import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dropdown-input-status',
  template: `
    <div class="dropdown custom-container">
      <button class="btn btn-custom-dropdown dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {{chooseValue}}
      </button>
      <ul class="dropdown-menu dropdown-menu-start dropdown_input">
        <li *ngFor="let name of valueNames; let i = index" (click)="setValue(values[i], name)">
          <a>{{name}}</a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .btn-custom-dropdown {
      border-radius: 5px;
      border-color: white;
      background-color: var(--banka-dark-gray);
      color: white;
      width: 90%;
    }
    .custom-container {
      overflow: visible;
    }
    a {
      margin: 7px;
    }
    li:hover {
      cursor: pointer;
    }
  `]
})
export class DropdownInputStatus {
  @Input() inputName: string = '';
  @Input() valueNames: string[] = [];
  @Input() values: any[] = [];
  @Input() initialValue: any = null;
  @Input() initialValues: any[] = [];
  @Output() selectedValue = new EventEmitter<any>();

  public chooseValue: string = "Choose " + this.inputName;

  ngOnInit() {
    const bankApproval = this.initialValues[0];
    const sellerApproval = this.initialValues[1];

    if (bankApproval && sellerApproval) {
      this.chooseValue = 'Approved';
    } else {
      this.chooseValue = 'Not Approved';
    }

    // if (bankApproval && !sellerApproval) {
    //   this.chooseValue = 'Waiting for bank approval';
    // } else if (!bankApproval || !sellerApproval) {
    //   this.chooseValue = 'Denied';
    // } else if (bankApproval && sellerApproval) {
    //   this.chooseValue = 'Approved';
    // } else {
    //   this.chooseValue = 'Processing';
    // }

    // if (this.initialValue !== null) {
    //   this.chooseValue = this.valueNames[this.values.indexOf(this.initialValue)];
    // }
  }

  setValue(value: any, valueName: string) {
    this.selectedValue.emit(value);
    this.chooseValue = valueName;
  }
}

@NgModule({
  declarations: [DropdownInputStatus],
  imports: [CommonModule],
  exports: [DropdownInputStatus],
})
export class DropdownInputStatusModule {}
