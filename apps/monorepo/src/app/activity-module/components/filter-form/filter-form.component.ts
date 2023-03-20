import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Activity } from '../../models/activity';
import { ActivityService } from '../../service/activity.service';
import { MatNativeDateModule } from '@angular/material/core';
import { Errand } from '../../models/errand';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
  ],
  selector: 'integrated-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  @Output() update = new EventEmitter<Activity[]>();

  searchText!: string;
  activities: Activity[] = [];
  filteredActivites: Activity[] = [];

  statusList: string[] = ['Nytt', 'Bereder', 'Pågående', 'Klart', 'Avbruten'];
  selectedStatus!: string[];

  selectedErrand!: string;
  errands: Errand[] = [
    { name: 'standard', display: 'Standard' },
    { name: 'telephone', display: 'Telefonärende' },
    { name: 'planned', display: 'Planerade arbeten' },
    { name: 'cancelled', display: 'Ledsagning' },
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private activityService: ActivityService) {
    this.filteredActivites = this.activities;
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((activities: Activity[]) => {
      this.activities = activities;
      this.update.emit(activities);
    });
  }

  applyFilters() {
    this.filteredActivites = this.activities;

    if (this.searchText) {
      this.filteredActivites = this.filteredActivites.filter((item) =>
        item.activityNumber
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    }

    if (this.range.value.start && this.range.value.end) {
      const start = new Date(this.range.value.start).getTime();
      const end = new Date(this.range.value.end).getTime();
      let time;

      this.filteredActivites = this.filteredActivites.filter((item) => {
        time = new Date(item.date).getTime();
        return time >= start && time <= end;
      });
    }

    if (this.selectedErrand) {
      this.filteredActivites = this.filteredActivites.filter(
        (item) =>
          item.errandType.toLowerCase() === this.selectedErrand.toLowerCase()
      );
    }

    if (this.selectedStatus && this.selectedStatus.length > 0) {
      this.filteredActivites = this.filteredActivites.filter((item) => {
        return this.selectedStatus.some(
          (selectedOption) =>
            item.status.toLowerCase() === selectedOption.toLowerCase()
        );
      });
    }

    this.update.emit(this.filteredActivites);
  }
}
