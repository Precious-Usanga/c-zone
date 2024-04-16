import { Component, OnInit, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AUTH_ROUTES_DEFINITION } from "@auth/auth.routes";
import { ISignInForm } from "@auth/models/auth-form.model";
import { ISignInPayload, ILoggedInResponse } from "@auth/models/auth.model";
import { AuthService } from "@auth/services/auth.service";
import { ErrorDisplayComponent } from "@core/components/error-display/error-display.component";
import { SnackBarService } from "@core/services/snack-bar.service";
import { StorageService } from "@core/services/storage.service";
import { UserProfileService } from "@core/services/user-profile.service";
import { Constants } from "@core/shared/constants";
import { MaterialModule } from "@core/shared/material.module";
import { SharedModule } from "@core/shared/shared.module";
import { DisplayErrorMessage } from "@core/utilities/input-validation";
import { REG_EXP } from "@core/utilities/reg-exp";
import { APP_BASE_ROUTES_DEFINITION } from "src/app/app.routes";


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, MaterialModule, ErrorDisplayComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  mailIcon = 'mail';
  visibilityIcon = 'visibility';
  visibilityOffIcon = 'visibility_off';
  passwordIcon = 'password';


  APP_BASE_ROUTES = APP_BASE_ROUTES_DEFINITION;
  AUTH_ROUTES = AUTH_ROUTES_DEFINITION;

  public signInForm!: FormGroup<ISignInForm>;
  public displayError = DisplayErrorMessage;
  public REG_EXP = REG_EXP;

  public isSigningIn = false;

  public apiError = {
    status: false,
    message: ''
  };

  private destroyRef = inject(DestroyRef);

  public passwordIsVisible: boolean = false;
  public passwordInputType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private userProfileService: UserProfileService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.pattern(REG_EXP.EMAIL)]],
      password: ['', Validators.required]
    });
  }

  get signInFormData(): ISignInForm {
    return this.signInForm.controls;
  }

  onSubmit(formPayload: ISignInForm) {
    if (this.apiError.status) this.apiError = { status: false, message: '' };

    const sign_in_payload: ISignInPayload = {
      email: formPayload.email.value,
      password: formPayload.password.value
    };

    this.signIn(sign_in_payload);
  }

  signIn(payload: ISignInPayload): void {
    this.isSigningIn = true;
    this.authService
      .signIn(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.storeDetailsLocallyAndUpdateObservers(response);
          this.isSigningIn = false;
          this.goToAdmin();
          this.snackBarService.openSnackBar({
            message: 'Welcome Back, Zoner! You are signed in',
            type: 'success'
          })
        },
        error: (error) => {
          this.isSigningIn = false;
          this.apiError = {
            status: true,
            message: error
          };
        }
      });
  }

  storeDetailsLocallyAndUpdateObservers(payload: ILoggedInResponse): void {
    try {
      this.storageService.set(
        Constants.STORAGE_VARIABLES.TOKEN,
        payload.accessToken
      );
      this.storageService.set(
        Constants.STORAGE_VARIABLES.USER,
        JSON.stringify(payload.user)
      );
    } catch (error) {
      console.error('Unable to store details locally', error);
    } finally {
      this.updateUserProfileService();
    }
  }

  updateUserProfileService(): void {
    const userObj = this.storageService.get(Constants.STORAGE_VARIABLES.USER) as string;
    this.userProfileService.updateProfile(JSON.parse(userObj));
  }

  togglePasswordInputVisibility(visibility: boolean) {
    this.passwordIsVisible = visibility;
    this.passwordInputType = visibility ? 'text' : 'password';
  }

  goToAdmin(): void {
    this.router.navigate([this.APP_BASE_ROUTES.ADMIN]);
  }

}
