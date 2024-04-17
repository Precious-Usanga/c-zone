import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { EmptyTableComponent } from "@core/components/empty-table/empty-table.component";
import { Roles } from "@core/enum/role";
import { Constants } from "@core/shared/constants";
import { MaterialModule } from "@core/shared/material.module";
import { SharedModule } from "@core/shared/shared.module";
import { COUNTRIES_ROUTES_DEFINITION } from "../../countries.routes";
import { COUNTRIES_DISPLAYED_COLUMNS, CountriesActionData, CountriesActionEnum, countriesTableEmptyState } from "../../data/countries.data";
import { ICountry, ICountriesAPiQuery, ICountriesTableData } from "../../models/countries.model";
import { IModalDialogData } from "@core/interfaces/modal.interface";
import { CallToActionModalComponent } from "@core/components/call-to-action-modal/call-to-action-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { CountriesService } from "../../services/countries.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-all-countries',
  standalone: true,
  imports: [SharedModule, MaterialModule, EmptyTableComponent],
  templateUrl: './all-countries.component.html',
  styleUrl: './all-countries.component.scss'
})
export class AllCountriesComponent implements OnInit, AfterViewInit {
  ROLES = Roles;
  COUNTRIES_ROUTES = COUNTRIES_ROUTES_DEFINITION;
  MORE_ACTION_ICON = 'more_vert';

  countries!: ICountry[];

  countriesApiQuery: ICountriesAPiQuery = {
    fields: ["name", "capital", "currencies", "region", "population", "cca2", "flags"]
  }

  COUNTRIES_TABLE_DATA!: ICountriesTableData[];
  displayedColumns = COUNTRIES_DISPLAYED_COLUMNS;
  countriesTableDataSource: MatTableDataSource<ICountriesTableData> = new MatTableDataSource();

  countriesActions = CountriesActionEnum;
  countriesActionData = CountriesActionData;
  countriesTableEmptyState = countriesTableEmptyState;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) countriesTable!: MatTable<ICountriesTableData>;
  PAGINATION = Constants.PAGINATION;

  callToActionModal = CallToActionModalComponent;

  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.getCountriesDataFromRoute();
  }

  ngAfterViewInit(): void {
    this.countriesTableDataSource.paginator = this.paginator;

  }

  getCountriesDataFromRoute() {
    this.route.data.subscribe((data) => {
      const routeData = data as { countriesData: ICountry[] };
      this.countries = routeData['countriesData'];
      this.populateCountriesTable(this.countries);
    });
  }

  populateCountriesTable(countries: ICountry[]): void {
    this.COUNTRIES_TABLE_DATA = countries.map((country) => {
      return {
        flag: country.flags.svg,
        commonName: country.name.common,
        officialName: country.name.official,
        capital: country.capital[0],
        currency: this.getCurrencies(country.currencies),
        population: country.population,
        region: country.region,
        action: country
      };
    });
    this.countriesTableDataSource.data = this.COUNTRIES_TABLE_DATA;
    this.countriesTable.renderRows();
  }

  getCurrencies(currencies: {[key: string]: {name: string; symbol: string}}): string {
    return Object.entries(currencies).map(([key, value]) => {
      return `${value.name} (${value.symbol})`;
    }).join(', ');
  }

  navigateToViewCountryPage(country: ICountry): void {
    const countryIsoCode = country.cca2.toLowerCase();
    this.router.navigate([COUNTRIES_ROUTES_DEFINITION.VIEW_COUNTRY(countryIsoCode)]);
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
    // else if (options.modal === this.setupSystemUserModal) {
    //   const modal = this.dialog.open(this.setupSystemUserModal, {
    //     data: options,
    //     disableClose: true,
    //     width: '100vw',
    //     height: '100vh',
    //     maxWidth: '100vw',
    //     panelClass: 'mat-dialog-container-shape-square'
    //   });
    //   this.setupSystemUserModalIsClosed(modal);
    // }
  }

  callToActionModalHandler(modal: MatDialogRef<CallToActionModalComponent>) {
    modal.componentInstance.modalDataEmitter.subscribe({
      next: (data: IModalDialogData<ICountry>) => {
        modal.componentInstance.callToActionLoading = true;
        const api_request: Observable<unknown> = this.callToActionApiRequest(data);
        api_request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (response) => {
            console.info(response);
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
      .subscribe(() => {
        this.getCountriesAndUpdateUI();
        callToActionModal.componentInstance.modalDataEmitter.unsubscribe();
      });
  }

  getCountriesAndUpdateUI() {
    this.countriesService.getCountries().subscribe({
      next: (response) => {
        console.info(response);
        this.countries = response;
        this.populateCountriesTable(this.countries);
      }
    })
  }

}
