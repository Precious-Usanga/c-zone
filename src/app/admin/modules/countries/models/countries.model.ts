
export interface ICountriesTableData {
  flag: string;
  commonName: string;
  officialName: string;
  capital: string;
  currency: string;
  population: number;
  region: string;
  action: ICountry;
}

export type CountryFields = "name" | "capital" | "currencies" | "region" | "population" | "cca2" | "flags";

export interface ICountriesAPiQuery {
  fields?: CountryFields[]
}

export interface ICountry {
  name: CountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
}

interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  }
}

interface CountryName {
  common: string;
  official: string;
  nativeName: NativeName;
}

interface NativeName {
  [key: string]: {
    official: string;
    common: string;
  }
}

interface CapitalInfo {
  latlng: number[];
}

interface CoatOfArms {
  png: string;
  svg: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Car {
  signs: string[];
  side: string;
}

interface Gini {
  [key: string]: number;
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

interface Demonyms {
  eng: Eng;
  fra: Eng;
}

interface Eng {
  f: string;
  m: string;
}

interface Translations {
  [key: string]: {
    official: string;
    common: string;
  }
}

interface Languages {
  [key: string]: string;
}

interface Idd {
  root: string;
  suffixes: string[];
}
