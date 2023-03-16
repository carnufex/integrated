import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { Errand } from '../../models/errand';
import { Action } from '../../models/action';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Activity } from '../../models/activity';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() columns!: Errand[];
  @Input() actions!: Action[];
  @Input() set data(value: unknown[]) {
    this.dataSource = new MatTableDataSource<unknown>(value);
  }

  public dataSource!: MatTableDataSource<unknown>;
  displayedColumns!: string[];

  @ViewChild(MatSort) sort!: MatSort;

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    if (this.actions && this.actions.length > 0) {
      // Add the column actions
      this.columns = [
        ...this.columns,
        { name: 'Actions', display: 'Funktioner' },
      ];
    }
    this.displayedColumns = this.columns.map((col) => col.name);
  }

  action(item: Action, element: Activity) {
    console.log(item);
    item.action(element);
  }
}
