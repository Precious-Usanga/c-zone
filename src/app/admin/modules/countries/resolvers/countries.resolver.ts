import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { CountriesService } from "../services/countries.service";
import { inject } from "@angular/core";
import { catchError } from "rxjs/internal/operators/catchError";
import { EMPTY } from "rxjs";
import { ICountriesAPiQuery, ICountry } from "../models/countries.model";

export const countriesDataResolver: ResolveFn<ICountry[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  countriesService = inject(CountriesService),
  router = inject(Router)
) => {

  const countriesApiQuery: ICountriesAPiQuery = {
    fields: ["name", "capital", "currencies", "region", "population", "cca2", "flags"]
  }

  return countriesService.getCountries(countriesApiQuery).pipe(
    catchError(() => {
      router.navigate([router.url]);
      return EMPTY;
    })
  );
};

export const viewCountryDataResolver: ResolveFn<ICountry> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  countriesService = inject(CountriesService),
  router = inject(Router)
) => {
  const countryIsoCode = <string>route.paramMap.get('countryIsoCode');

  return countriesService.getCountry(countryIsoCode).pipe(
    catchError(() => {
      router.navigate([router.url]);
      return EMPTY;
    })
  );
};
