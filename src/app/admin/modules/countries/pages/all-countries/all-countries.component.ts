import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { COUNTRIES_ROUTES_DEFINITION } from '../../countries.routes';
import { ICountriesAPiQuery, ICountriesTableData, ICountry } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';
import { Observable, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { COUNTRIES_DISPLAYED_COLUMNS, CountriesActionEnum, countriesTableEmptyState } from '../../data/countries.data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../../../../../core/shared/shared.module';
import { MaterialModule } from '../../../../../core/shared/material.module';
import { EmptyTableComponent } from '../../../../../core/components/empty-table/empty-table.component';
import { Router } from '@angular/router';
import { Roles } from '../../../../../core/enum/role';
import { Constants } from '../../../../../core/shared/constants';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-countries',
  standalone: true,
  imports: [SharedModule, MaterialModule, EmptyTableComponent],
  templateUrl: './all-countries.component.html',
  styleUrl: './all-countries.component.scss'
})
export class AllCountriesComponent implements OnInit {
  ROLES = Roles;
  COUNTRIES_ROUTES = COUNTRIES_ROUTES_DEFINITION;
  MORE_ACTION_ICON = 'more_vert';

  countries$!: Observable<ICountry[]>;

  countriesApiQuery: ICountriesAPiQuery = {
    fields: ["name", "capital", "currencies", "region", "population", "cca2", "flags"]
  }


  COUNTRIES_TABLE_DATA!: ICountriesTableData[];
  displayedColumns = COUNTRIES_DISPLAYED_COLUMNS;
  countriesTableDataSource: MatTableDataSource<ICountriesTableData> = new MatTableDataSource();

  countriesActions = CountriesActionEnum;
  countriesTableEmptyState = countriesTableEmptyState;

  private destroyRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  PAGINATION = Constants.PAGINATION;

  constructor(
    private countriesService: CountriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCountries(this.countriesApiQuery);
  }

  getCountries(queryParams?: ICountriesAPiQuery): void {
    const params = queryParams ? { ...queryParams } : {};

    this.countries$ = this.countriesService.getCountries(params).pipe(
      tap((response) => {
        this.populateCountriesTable(response);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
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
    this.countriesTableDataSource = new MatTableDataSource<ICountriesTableData>(this.COUNTRIES_TABLE_DATA);
    this.countriesTableDataSource.paginator = this.paginator;
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

}
