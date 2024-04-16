import { Constants } from "./constants";

const COUNTRIES_BASE_URL = Constants.BASE_URLS.COUNTRIES;

export const Endpoint = {
  COUNTRIES: {
    get_all_countries: `${COUNTRIES_BASE_URL}/all`,
    get_a_country: (countryIsoCode: string) => `${COUNTRIES_BASE_URL}/alpha/${countryIsoCode}`
  }
}
