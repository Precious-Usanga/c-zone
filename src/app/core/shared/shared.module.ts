import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '@core/components/logo/logo.component';
import { AllowedRolesDirective } from '@core/directives/allowed-roles/allowed-roles.directive';

const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  LogoComponent,
  AllowedRolesDirective
];
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule {}
