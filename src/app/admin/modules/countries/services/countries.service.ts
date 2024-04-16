import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Endpoint } from "@core/shared/endpoints"
import { Observable, map, of, tap } from "rxjs"
import { ICountriesAPiQuery, ICountry } from "../models/countries.model"
import { StorageService } from "@core/services/storage.service"
import { Constants } from "@core/shared/constants"


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private countriesCache = this.storageService.get<string>(Constants.STORAGE_VARIABLES.COUNTRIES);

  private getCountriesCache = (countriesData: string | null): ICountry[] | null => {
    if (countriesData) {
      return <ICountry[]>JSON.parse(countriesData);
    }
    return null;
  }

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  updateCachedCountriesDataSource(countries: ICountry[]) {
    this.storageService.set(
      Constants.STORAGE_VARIABLES.COUNTRIES,
      JSON.stringify(countries)
    );
  }

  getCountries(query?: ICountriesAPiQuery): Observable<ICountry[]> {
    const cachedCountries = this.getCountriesCache(this.countriesCache);

    if (cachedCountries) {
      return of(cachedCountries);
    } else {
      return this.http.get<ICountry[]>(`${Endpoint.COUNTRIES.get_all_countries}`, { params: { ...query } }).pipe(
        tap((response) => {
          this.updateCachedCountriesDataSource(response);
        })
      )
    }
  }

  getCountry(countryIsoCode: string): Observable<ICountry> {
    return this.http.get<ICountry[]>(`${Endpoint.COUNTRIES.get_a_country(countryIsoCode)}`).pipe(
      map((response) => response['0'])
    )
  }
}
