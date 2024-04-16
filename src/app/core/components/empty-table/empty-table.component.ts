import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITableEmptyState } from './models/empty-table.model';
import { Assets } from '../../shared/assets';

@Component({
  selector: 'app-empty-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-table.component.html',
  styleUrl: './empty-table.component.scss'
})
export class EmptyTableComponent {
  @Input() isSearch = {
    status: false,
    query: ''
  };

  @Input({ required: true }) tableEmptyState!: ITableEmptyState;

  NO_SEARCH_RESULT_ILLUSTRATION = Assets.ILLUSTRATIONS.EMPTY_TABLE;
}
