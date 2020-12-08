import { Injectable } from '@angular/core';
import { MySnackbarService } from '../shared/my-snackbar/my-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

constructor(private snackBar: MySnackbarService) { }


success(message: string) {
  this.snackBar.openSnackBar(message, 'x', 'SnackSuccess');

}

error(message: string) {
  this.snackBar.openSnackBar(message, 'x', 'SnackError');

}

warning(message: string) {
  this.snackBar.openSnackBar(message, 'x', 'SnackWarn');
}

message(message: string) {
  this.snackBar.openSnackBar(message, 'x', 'SnackInfo');
}
}
