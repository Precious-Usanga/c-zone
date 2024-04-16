import { ITableEmptyState } from "@core/components/empty-table/models/empty-table.model";
import { Assets } from "@core/shared/assets";




export const COUNTRIES_DISPLAYED_COLUMNS = ['flag', 'commonName', 'officialName', 'capital', 'currency', 'population', 'region', 'action'];

export enum CountriesActionEnum {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

export const countriesTableEmptyState: ITableEmptyState = {
  illustration: Assets.ILLUSTRATIONS.EMPTY_TABLE,
  message: 'No country data available'
};
