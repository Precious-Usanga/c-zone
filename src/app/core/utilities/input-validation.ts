import {
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    if (form?.submitted) {
      return !!(control?.invalid && (control?.dirty || !isSubmitted));
    } else {
      return !!((control?.dirty || isSubmitted) && control?.touched && control?.invalid);
    }
  }
}

export const DisplayErrorMessage = (control: FormControl | null) => {
  return !!(control?.dirty && control?.touched && control?.invalid);
};

