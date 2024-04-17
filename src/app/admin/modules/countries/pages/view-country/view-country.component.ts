import { Component, DestroyRef, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Roles } from "@core/enum/role";
import { MaterialModule } from "@core/shared/material.module";
import { SharedModule } from "@core/shared/shared.module";
import { ICountry } from "../../models/countries.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CallToActionModalComponent } from "@core/components/call-to-action-modal/call-to-action-modal.component";
import { IModalClosed, IModalDialogData } from "@core/interfaces/modal.interface";
import { Observable, of } from "rxjs";
import { CountriesService } from "../../services/countries.service";
import { CountriesActionEnum, CountriesActionData } from "../../data/countries.data";
import { COUNTRIES_ROUTES_DEFINITION } from "../../countries.routes";


@Component({
  selector: 'app-view-country',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './view-country.component.html',
  styleUrl: './view-country.component.scss'
})
export class ViewCountryComponent {
  ROLES = Roles;
  COUNTRIES_ROUTES = COUNTRIES_ROUTES_DEFINITION;

  editIcon = 'edit';
  deleteIcon = 'delete';

  country!: ICountry;
  countriesActions = CountriesActionEnum;
  countriesActionData = CountriesActionData;

  callToActionModal = CallToActionModalComponent;

  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private countriesService: CountriesService
  ) {
    this.getCountryDataFromRoute();
  }

  getCountryDataFromRoute() {
    this.route.data.subscribe((data) => {
      const routeData = data as { countryData: ICountry };
      this.country = routeData['countryData'];
    });
  }

  countryFlagUrl(url: string) {
    return `url("${url}")`;
  }

  openDialog(options: IModalDialogData) {
    const width = '400px';
    if (options.modal === this.callToActionModal) {
      if (options.action === this.countriesActions.DELETE) {
        options.callToActionModal = this.countriesActionData['DELETE_COUNTRY'];
      }
      const callToActionModal = this.dialog.open(this.callToActionModal, {
        data: options,
        disableClose: true,
        width
      });
      this.callToActionModalHandler(callToActionModal);
      this.callToActionModalIsClosed(callToActionModal);
    }
  }

  callToActionModalHandler(modal: MatDialogRef<CallToActionModalComponent>) {
    modal.componentInstance.modalDataEmitter.subscribe({
      next: (data: IModalDialogData<ICountry>) => {
        modal.componentInstance.callToActionLoading = true;
        const api_request: Observable<unknown> = this.callToActionApiRequest(data);
        api_request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (response) => {
            modal.componentInstance.callToActionLoading = false;
            modal.componentInstance.closeModal(
              {
                modalData: data,
                result: {
                  data: response,
                  status: 'closed',
                  message: 'Modal closed'
                }
              }
            )
          },
          error: (error) => {
            modal.componentInstance.callToActionLoading = false;
            modal.componentInstance.CALL_TO_ACTION_ERROR_RESPONSE = {
              message: error,
              status: true
            };
          }
        });
      }
    });
  }

  callToActionApiRequest(data: IModalDialogData<ICountry>): Observable<unknown> {
    let api_request: Observable<unknown> = of(null);
    const countryData = data.extraData;
    if (countryData) {
      if (data.action === this.countriesActions.DELETE) {
        api_request = this.countriesService.deleteCountry(countryData);
      }
    }
    return api_request;
  }

  callToActionModalIsClosed(callToActionModal: MatDialogRef<CallToActionModalComponent>): void {
    callToActionModal
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: IModalClosed) => {
        if (response.modalData.action === this.countriesActions.DELETE) {
          this.navigateBackToAllCountriesPage();
        }
        callToActionModal.componentInstance.modalDataEmitter.unsubscribe();
      });
  }

  navigateBackToAllCountriesPage() {
    this.router.navigate([this.COUNTRIES_ROUTES.ALL_COUNTRIES]);
  }
}
