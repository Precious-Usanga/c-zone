import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModalDialogData, IModalClosed, CTAThemeColor } from '@core/interfaces/modal.interface';
import { MaterialModule } from '@core/shared/material.module';
import { SharedModule } from '@core/shared/shared.module';
import { ErrorDisplayComponent } from '../error-display/error-display.component';

@Component({
  selector: 'app-call-to-action-modal',
  standalone: true,
  imports: [SharedModule, MaterialModule, ErrorDisplayComponent],
  templateUrl: './call-to-action-modal.component.html',
  styleUrl: './call-to-action-modal.component.scss'
})
export class CallToActionModalComponent {
  closeIcon = 'close';

  callToActionModalData!: IModalDialogData['callToActionModal'];

  callToActionLoading: boolean = false;

  @Output() modalDataEmitter = new EventEmitter<IModalDialogData>();

  CALL_TO_ACTION_ERROR_RESPONSE = {
    status: false,
    message: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalDialogData,
    private modal: MatDialogRef<CallToActionModalComponent>
  ) {
    this.callToActionModalData = data.callToActionModal;
  }

  submitDialogAction(data: IModalDialogData) {
    if (this.CALL_TO_ACTION_ERROR_RESPONSE.status) {
      this.CALL_TO_ACTION_ERROR_RESPONSE = { status: false, message: '' };
    }

    this.modalDataEmitter.emit(data);
  }

  closeModal(data?: IModalClosed) {
    if (data) {
      this.modal.close(data);
    } else {
      this.modal.close();
    }
  }

  setSubmitButtonColor(themeColor: CTAThemeColor): string {
    let submitButtonColor = '';
    if (themeColor === 'primary') {
      submitButtonColor = 'primary';
    } else if (themeColor === 'error') {
      submitButtonColor = 'warn';
    } else {
      submitButtonColor = 'primary';
    }
    return submitButtonColor;
  }
}
