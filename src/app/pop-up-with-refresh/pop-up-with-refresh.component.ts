import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pop-up-with-refresh',
  standalone: true,
    imports: [
        MatButton
    ],
  templateUrl: './pop-up-with-refresh.component.html',
  styleUrl: './pop-up-with-refresh.component.css'
})
export class PopUpWithRefreshComponent {
  message!: string;
  text!: string;

  constructor(
    public dialogRef: MatDialogRef<PopUpWithRefreshComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, text: string }
  ) { }

  ngOnInit(): void {
    this.message = this.data.message;
    this.text = this.data.text;
  }

  closePopup(): void {
    this.dialogRef.close();
    window.location.reload();
  }
}
