import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DataTableColumn } from './models/data-table-column.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss'],
})
export class DataTable<T extends object> {
  @Input({ required: true })
  data: T[] = [];

  @Input({ required: true })
  columns: DataTableColumn<T>[] = [];

  @Input()
  cellTemplates: Record<string, TemplateRef<unknown>> = {};

  @Output()
  sortChanged = new EventEmitter<Sort>();

  @Output()
  view = new EventEmitter<T>();

  @Output()
  edit = new EventEmitter<T>();

  @Output()
  delete = new EventEmitter<T>();

  get displayedColumns(): string[] {
    return this.columns.map((column) => String(column.key));
  }
  columnName(column: DataTableColumn<T>): string {
    return column.key.toString();
  }
}
