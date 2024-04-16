import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Endpoint } from '../../../../core/shared/endpoints';
import { ICountriesAPiQuery, ICountry } from '../models/countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries(query?: ICountriesAPiQuery): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${Endpoint.COUNTRIES.get_all_countries}`, { params: {...query}}).pipe(
      map((response) => response)
    )
  }

  getCountry(countryIsoCode: string): Observable<ICountry> {
    return this.http.get<ICountry[]>(`${Endpoint.COUNTRIES.get_a_country(countryIsoCode)}`).pipe(
      map((response) => response['0'])
    )

  }
}
