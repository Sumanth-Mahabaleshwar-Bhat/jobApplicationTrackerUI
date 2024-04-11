import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  onSuccessNotification(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["success-snackbar"]
    });
  }

  onErrorNotification(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["error-snackbar"]
    });
  }

  onWarningNotification(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["warning-snackbar"]
    });
  }
}
