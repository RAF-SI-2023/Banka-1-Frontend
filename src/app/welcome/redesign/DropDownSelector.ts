import {Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'dropdown-selector',
  template: `
    <mat-label class="dropdown-label">Please select the {{heading}}</mat-label>
    <mat-form-field appearance="outline" class="form-field">
      <mat-select [(ngModel)]="selectedValue" (selectionChange)="onSelectionChange()" disableOptionCentering
                  md-container-class="mySelect" panelClass="dropDown-overlay dropDown-list">
        <mat-option class="drop-down-option" [disabled]="true" [value]="-1"> Please select the {{heading}}
        </mat-option>
        <mat-option class="drop-down-option" *ngFor="let item of dropDownList" [value]="item[valueField]">
          {{ item[labelField] }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    .btn-custom-dropdown {
      border-radius: 5px;
      border-color: white;
      background-color: var(--banka-dark-gray);
      color: white;
      width: 90%;
    }
    .custom-container{
      overflow: visible;
    }
    a {
      margin: 7px;
    }
    li:hover{
      cursor: pointer;
    }
  `]
})
export class DropdownSelector implements OnInit, OnChanges{
  @Input() config: any = {};
  @Output() selectionChanged = new EventEmitter<any>();
  dropDownList: any[] = [];
  selectedValue: any = null;
  valueField: string = '';
  labelField: string = '';
  placeholder: string = '';
  heading: string = '';

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.dropDownList = this.config.dropDownList || [];
      this.selectedValue = this.config.selectedValue ?? -1;
      this.valueField = this.config.valueField || 'value';
      this.labelField = this.config.labelField || 'label';
      this.placeholder = this.config.placeholder || 'placeholder';
      this.heading = this.config.heading;
    }
  }

  onSelectionChange() {
    this.selectionChanged.emit(this.selectedValue);
  }

  calculateDropdownWidth() {
    let heading = "Please select the "+this.heading;
    let maxLength = heading.length;
    this.dropDownList.forEach(rule => {
      if (rule[this.labelField].length > maxLength) {
        maxLength = rule[this.labelField].length;
      }
    });

    const viewportWidth = window.innerWidth;
    const approximateCharWidth = 8; // Assume each char takes approximately 8 pixels
    const maxWidth = maxLength * approximateCharWidth;

    const widthInVW = (maxWidth / viewportWidth) * 100;  // Convert max width in pixels to vw
    return widthInVW;
  }

}

@NgModule({
  declarations: [DropdownSelector],
  imports: [CommonModule, FormsModule, MatSelect, MatOption, MatFormField, MatLabel],
  exports: [DropdownSelector],
})
export class DropdownSelectorModule {}
