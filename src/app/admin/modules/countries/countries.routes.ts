import { ADMIN_ROUTES_DEFINITION } from "@admin/admin.routes";
import { AppRoutes } from "@core/interfaces/app-route.interface";
import { AllCountriesComponent } from "./pages/all-countries/all-countries.component";
import { ViewCountryComponent } from "./pages/view-country/view-country.component";
import { countriesDataResolver, viewCountryDataResolver } from "./resolvers/countries.resolver";



const COUNTRIES_BASE = ADMIN_ROUTES_DEFINITION.COUNTRIES;

export const COUNTRIES_ROUTES_DEFINITION = {
  ALL_COUNTRIES: `${COUNTRIES_BASE}/all-countries`,
  VIEW_COUNTRY: (countryIsoCode: string) => `${COUNTRIES_BASE}/view-country/${countryIsoCode}`
};

export const COUNTRIES_ROUTES: AppRoutes = [
  {
    path: 'all-countries',
    component: AllCountriesComponent,
    data: {
      title: 'Countries',
      toolbar: {
        displayTitle: true
      }
    },
    resolve: {
      countriesData: countriesDataResolver
    }
  },
  {
    path: 'view-country/:countryIsoCode',
    component: ViewCountryComponent,
    data: {
      title: 'View Country',
      toolbar: {
        displayTitle: false
      }
    },
    resolve: {
      countryData: viewCountryDataResolver
    }
  },
  {
    path: '',
    redirectTo: 'all-countries',
    pathMatch: 'full'
  }
];
