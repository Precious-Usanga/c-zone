import { ITableEmptyState } from "@core/components/empty-table/models/empty-table.model";
import { IModalDialogData } from "@core/interfaces/modal.interface";
import { Assets } from "@core/shared/assets";




export const COUNTRIES_DISPLAYED_COLUMNS = ['flag', 'commonName', 'officialName', 'capital', 'currency', 'population', 'region', 'action'];

export enum CountriesActionEnum {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}


export const CountriesActionData: { [key: string]: IModalDialogData['callToActionModal'] } = {
  DELETE_COUNTRY: {
    title: 'Delete country',
    question: 'Are you sure you want to delete this country?',
    theme_color: 'error',
    action_button_text: 'Delete',
    cancel_button_text: 'Cancel',
    icon: 'delete'
  }
};

export const countriesTableEmptyState: ITableEmptyState = {
  illustration: Assets.ILLUSTRATIONS.EMPTY_TABLE,
  message: 'No country data available'
};
