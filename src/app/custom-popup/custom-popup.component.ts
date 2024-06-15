import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";
import {DropdownInputModule} from "../welcome/redesign/DropdownInput";

@Component({
  selector: 'app-custom-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './custom-popup.component.html',
  styleUrl: './custom-popup.component.css'
})
export class CustomPopupComponent {

    title: string = "";
    header: string = "";
    message: string = "";

  constructor( public dialogRef: MatDialogRef<CustomPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.header = data.header;
    this.message = data.message;
  }


  onCancelButton(){
    this.dialogRef.close();
  }

}
