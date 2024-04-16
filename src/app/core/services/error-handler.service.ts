import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBarService: SnackBarService) { }

  handleError(error?: ErrorEvent | HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (!navigator.onLine) {
      errorMessage = 'No Internet Connection. Please check your internet provider';
    } else if (error && error instanceof HttpErrorResponse) {
      errorMessage = this.processErrorMessage(error);
    } else if (error?.error instanceof ErrorEvent) {
      errorMessage = error?.error?.message ?? 'An error occurred';
    }
    this.snackBarService.openSnackBar({
      message: errorMessage,
      type: 'error'
    })

    return throwError(() => new Error(errorMessage));
  }

  // returns a string of the error message from the HttpErrorResponse
  processErrorMessage(error: HttpErrorResponse): string {
    const apiErrorResponse = error.error;
    const message = typeof apiErrorResponse.message === 'string' ? apiErrorResponse.message : 'An error occured';

    return message;
  }
}
