import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Roles } from '@core/enum/role';
import { UserProfileService } from '@core/services/user-profile.service';


@Directive({
  selector: '[appAllowedRoles]',
  standalone: true
})
export class AllowedRolesDirective {

  private isVisible = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private userProfileService: UserProfileService
  ) { }

  getUser() {
    return this.userProfileService.userProfileData;
  }

  canAccessResource(allowedRoles: Roles[]): boolean {
    const userData = this.getUser();
    if (userData && allowedRoles.includes(userData.role)) {
      return true;
    } else {
      return false;
    }
  }

  @Input() set appAllowedRoles(param: Roles[]) {
    if (param) {
      const grantAccess = this.canAccessResource(param);
      if (grantAccess && !this.isVisible) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isVisible = true;
      } else if (!grantAccess && this.isVisible) {
        this.viewContainer.clear();
        this.isVisible = false;
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    }
  }
}
