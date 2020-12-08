import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-snackbar',
  templateUrl: './my-snackbar.component.html',
  styleUrls: ['./my-snackbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MySnackbarComponent implements OnInit {
  icon;
  style;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  public snackBarRef: MatSnackBarRef<MySnackbarComponent>, ) { }
  ngOnInit() {
    switch (this.data.snackType) {
      case 'SnackSuccess':
        this.style = 'snackdone';
        this.icon = 'done';
        return 'done';
      case 'SnackError':
        this.style = 'snackerror';
        this.icon = 'error';
        return 'error';
      case 'SnackWarn':
        this.style = 'snackwarn';
        this.icon = 'warning';
        return 'warning';
      case 'SnackInfo':
        this.style = 'snackinfo';
        this.icon = 'info';
        return 'info';
    }
  }

}
