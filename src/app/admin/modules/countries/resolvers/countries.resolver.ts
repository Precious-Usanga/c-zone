import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { CountriesService } from "../services/countries.service";
import { inject } from "@angular/core";
import { catchError } from "rxjs/internal/operators/catchError";
import { EMPTY } from "rxjs";

export const viewCountryDataResolver: ResolveFn<any> = (
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
