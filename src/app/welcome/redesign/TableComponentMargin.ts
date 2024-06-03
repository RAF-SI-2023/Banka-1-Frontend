import {ContentChild, NgModule, TemplateRef} from '@angular/core';
import {CommonModule} from "@angular/common";
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-table-margin',
  template: `
    <div *ngIf="!showMarginAccount">
      <table>
        <thead>
        <tr>
          <th *ngFor="let header of headersArray">{{ header }}</th>
          <th *ngIf="showAnotherColumn"></th> <!-- New column header -->
          <th *ngIf="showActions">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let row of dataArray; let i = index">
          <td *ngFor="let key of objectKeys(row)">
            {{ row[key] }}
          </td>
          <td *ngIf="showAnotherColumn">
            <ng-container *ngTemplateOutlet="anotherColumnTemplate; context: {$implicit: row, index: i}"></ng-container>
          </td>
          <td *ngIf="showActions">
            <ng-container *ngTemplateOutlet="customTemplate; context: {$implicit: row, index: i}"></ng-container>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div *ngIf="showMarginAccount">
      <table>
        <thead>
        <tr>
          <th *ngFor="let header of headersArray">{{ header }}</th>
          <th *ngIf="showAnotherColumn"></th> <!-- New column header -->
          <th *ngIf="showActions">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let row of dataArray; let i = index">
          <td *ngIf="showMarginAccount" class="margin-account-column">
            <ng-container *ngTemplateOutlet="marginAccountTemplate; context: {$implicit: row, index: i}"></ng-container>
          </td>
          <td *ngFor="let key of objectKeys(removeMarginCallKey(row))">
            {{ row[key] }}
          </td>
          <td *ngIf="showAnotherColumn">
            <ng-container *ngTemplateOutlet="anotherColumnTemplate; context: {$implicit: row, index: i}"></ng-container>
          </td>
          <td *ngIf="showActions">
            <ng-container *ngTemplateOutlet="customTemplate; context: {$implicit: row, index: i}"></ng-container>
          </td>
          <td *ngIf="showMarginAccount">
            <ng-container *ngTemplateOutlet="marginCallTemplate; context: {$implicit: row, index: i}"></ng-container>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Jura', sans-serif;
      font-size: 1.1em;
      color: var(--banka-white);
      margin: 20px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      /*overflow: hidden;*/
      border-radius: 30px;
      text-align: center;
    }

    tr {
      border-left: 10px solid var(--banka-dark-gray);
      border-right: 10px solid var(--banka-dark-gray);
      background-color: var(--banka-very-dark-gray);
    }

    tr:last-child {
      border-bottom: 10px solid var(--banka-dark-gray);
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
    }

    td {
      padding-top:20px;
      padding-bottom:20px;
      padding-right:20px;
    }


    th {
      border: 10px solid var(--banka-very-dark-gray);
      background-color: var(--banka-very-dark-gray); /* Dark grayish-blue for the header */
      color: var(--banka-white);
      padding: 20px 15px;
    }

    td {
      padding: 12px 15px;
      background-color: var(--banka-dark-gray); /* Light beige for table cells */
      border-bottom: 1px solid var(--banka-white); /* Horizontal line color */
    }

    tbody tr:hover td {
      background-color: var(--banka-very-dark-gray); /* Light brown for row hover */
    }

    .wrap {
      margin-bottom: 200px;
    }

    .margin-account-column {
      cursor: pointer; /* Change cursor style when hovering over the margin account column */
    }
  `]
})
export class TableComponentMargin {
  @Input() headersArray: string[] = [];
  @Input() dataArray: any[] = [];
  @Input() showAnotherColumn: boolean = false;
  @Input() showActions: boolean = false;
  @Input() showMarginAccount: boolean = false;

  @ContentChild('actionsColumn', { read: TemplateRef}) customTemplate!: TemplateRef<any>;
  @ContentChild('marginCallColumn', { read: TemplateRef}) marginCallTemplate!: TemplateRef<any>;
  @ContentChild('marginAccountColumn', { read: TemplateRef}) marginAccountTemplate!: TemplateRef<any>;
  @ContentChild('anotherColumn', { read: TemplateRef }) anotherColumnTemplate!: TemplateRef<any>; // New template reference for the additional column content

  // Helper function to get keys from the row object
  // objectKeys = Object.keys;

  objectKeys(row: any): string[] {
    //OBRATITI PAZNJU !!!!!!!!
    return Object.keys(row).filter(
      (key) => !key.includes('original')
    )
  }

  removeMarginCallKey(row: any): any {
    const newRow = { ...row };
    delete newRow.marginAccount;
    delete newRow.marginCall;
    return newRow;
  }
}
@NgModule({
  declarations: [TableComponentMargin],
  imports: [CommonModule],
  exports: [TableComponentMargin],
})
export class TableComponentMarginModule {}
