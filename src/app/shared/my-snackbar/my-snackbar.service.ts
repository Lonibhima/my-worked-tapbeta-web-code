import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MySnackbarComponent } from './my-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class MySnackbarService {

constructor(private snackBar: MatSnackBar) { }
public openSnackBar(message: string, action: string, snackType?) {
  const _snackType = snackType !== undefined ? snackType : 'Success';

  this.snackBar.open(message, action, {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: snackType
  });
}

}
