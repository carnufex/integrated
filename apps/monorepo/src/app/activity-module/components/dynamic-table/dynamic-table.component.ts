import { NgForOf, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { Errand } from '../../models/errand';
import { Action } from '../../models/action';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Activity } from '../../models/activity';
import { Column } from '../../models/column';

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
    MatSortModule,
  ],
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @Input() columns!: Column[];
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  action(item: Action, element: Activity) {
    console.log(item);
    item.action(element);
  }
}
