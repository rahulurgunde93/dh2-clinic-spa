import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.scss'],
})
export class ConfirmationDialog {
  readonly data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef<ConfirmationDialog>);

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
