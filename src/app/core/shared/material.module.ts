import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

const material = [
  MatDividerModule,
  MatSidenavModule,
  MatTabsModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatChipsModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatInputModule,
  CdkAccordionModule,
  MatListModule,
  DragDropModule,
  MatTooltipModule,
  MatPaginatorModule
];

@NgModule({
  imports: [...material],
  exports: [...material]
})
export class MaterialModule {}
