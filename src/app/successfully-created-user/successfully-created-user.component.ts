import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrangeButtonModule } from "../welcome/redesign/OrangeButton";


@Component({
  selector: 'app-successfully-created-user',
  standalone: true,
  imports: [OrangeButtonModule],
  templateUrl: './successfully-created-user.component.html',
  styleUrl: './successfully-created-user.component.css'
})
export class SuccessfullyCreatedUserComponent {
  constructor(public dialogRef: MatDialogRef<SuccessfullyCreatedUserComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
