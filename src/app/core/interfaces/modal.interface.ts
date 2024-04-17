import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';

export interface IModalDialogData<T = unknown> {
  modal: ComponentType<unknown> | TemplateRef<unknown>;
  action: string;
  extraData?: T;
  callToActionModal?: CallToActionModalData;
}
interface CallToActionModalData {
  title: string;
  question: string;
  extraText?: string;
  icon: string;
  theme_color: CTAThemeColor;
  cancel_button_text: string;
  action_button_text: string;
}

export interface IModalClosed<T = unknown> {
  modalData: IModalDialogData;
  result: IModalResult<T>;
}
export type ModalStatus = 'open' | 'closed';
interface IModalResult<T> {
  data: T;
  status: ModalStatus;
  message: string;
}
export type CTAThemeColor = 'primary' |'error';
