import { Component } from '@angular/core';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';
import { Activity } from '../../models/activity';
import { Action } from '../../models/action';
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
    { name: 'activityNumber', display: 'Aktivitetsnummer' },
    { name: 'topic', display: 'Rubrik', sortable: true },
    { name: 'errandType', display: 'Ärendetyp', sortable: true },
    { name: 'status', display: 'Status' },
    { name: 'supervisor', display: 'Ärendeansvarig', sortable: true },
    { name: 'supervisingGroup', display: 'Ansvarig Grupp', sortable: true },
    { name: 'tags', display: 'Taggar' },
    { name: 'date', display: 'Skapat', sortable: true },
  ];

  actions: Action[] = [
    {
      name: 'Delete',
      icon: 'delete',
      action: this.parentFunction1.bind(this),
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

  parentFunction1(callback: any) {
    const x = callback();
    console.log(x);
  }

  parentFunction2() {
    console.log('parent func 2');
  }

  onUpdate(data: Activity[]): void {
    this.dataSource = data;
  }
}
