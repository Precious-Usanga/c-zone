import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarData, SnackbarComponent } from '../components/snackbar/snackbar.component';
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(data: ISnackBarData) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data,
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
