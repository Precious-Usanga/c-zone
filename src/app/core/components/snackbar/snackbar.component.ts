import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

export interface ISnackBarData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  action?: string;
}

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  successIcon = 'check_circle';
  errorIcon = 'error';
  warningIcon = 'warning';
  infoIcon = 'info';

  snackBarRef = inject(MatSnackBarRef);
  snackBarActions = MatSnackBarActions;
  snackBarAction = MatSnackBarAction;
  snackBarLabel = MatSnackBarLabel;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarData) {}
}
