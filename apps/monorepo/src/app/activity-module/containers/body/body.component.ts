import { Component } from '@angular/core';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';
import { Activity } from '../../models/activity';
import { Action } from '../../models/action';
import { Errand } from '../../models/errand';
import { Column } from '../../models/column';

@Component({
  standalone: true,
  imports: [FilterFormComponent, DynamicTableComponent],
  selector: 'integrated-table-body',
  template: `
    <div>
      <integrated-filter-form (update)="onUpdate($event)">
      </integrated-filter-form>
      <dynamic-table
        [data]="this.dataSource"
        [columns]="displayedColumns"
        [actions]="actions"
      ></dynamic-table>
    </div>
  `,
  styles: [``],
})
export class TableBodyComponent {
  dataSource!: Activity[];

  displayedColumns: Column[] = [
    { name: 'activityNumber', display: 'Aktivitetsnummer', sortable: true },
    { name: 'topic', display: 'Rubrik' },
    { name: 'errandType', display: 'Ärendetyp' },
    { name: 'status', display: 'Status' },
    { name: 'supervisor', display: 'Ärendeansvarig' },
    { name: 'supervisingGroup', display: 'Ansvarig Grupp' },
    { name: 'tags', display: 'Taggar' },
    { name: 'date', display: 'Skapat' },
  ];

  actions: Action[] = [
    {
      name: 'Delete',
      icon: 'delete',
      action: this.parentFunction1,
    },
    {
      name: 'Edit',
      icon: 'edit',
      action: this.parentFunction2,
    },
    {
      name: 'Go To Activity',
      icon: 'subject',
      action: this.parentFunction2,
    },
  ];

  parentFunction1(args: any) {
    console.log('parent func 1', args);
  }

  parentFunction2() {
    console.log('parent func 2');
  }

  onUpdate(data: Activity[]): void {
    this.dataSource = data;
  }
}
