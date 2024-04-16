import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppLogoComponent } from '../components/app-logo/app-logo.component';
import { AllowedRolesDirective } from '../directives/allowed-roles/allowed-roles.directive';

const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  AppLogoComponent,
  AllowedRolesDirective
];
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule {}
