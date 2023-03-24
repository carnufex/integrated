import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const customPresets = [
  'Idag',
  'Senaste 7 dagarna',
  'Den här veckan',
  'Förra veckan',
  'Den här månaden',
  'Förra månaden',
  'Det här året',
  'Förra året',
] as const; // convert to readonly tuple of string literals

// equivalent to "today" | "Förra 7 dagarna" | ... | "Förra året"
type CustomPreset = (typeof customPresets)[number];

@Component({
  selector: 'range-panel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonToggleModule],
  templateUrl: './range-panel.component.html',
  styleUrls: ['./range-panel.component.scss'],
})
export class RangePanelComponent<D> {
  // list of range presets we want to provide:
  readonly customPresets = customPresets;

  constructor(
    private dateAdapter: DateAdapter<D>,
    private picker: MatDateRangePicker<D>
  ) {}

  // called when user selects a range preset:
  selectRange(rangeName: CustomPreset): void {
    const [start, end] = this.calculateDateRange(rangeName);
    this.picker.select(start);
    this.picker.select(end);
    this.picker.close();
  }

  private calculateDateRange(rangeName: CustomPreset): [start: D, end: D] {
    const today = this.today;
    const year = this.dateAdapter.getYear(today);

    switch (rangeName) {
      case 'Idag':
        return [today, today];
      case 'Senaste 7 dagarna': {
        const start = this.dateAdapter.addCalendarDays(today, -6);
        return [start, today];
      }
      case 'Den här veckan': {
        return this.calculateWeek(today);
      }
      case 'Den här månaden': {
        return this.calculateMonth(today);
      }
      case 'Det här året': {
        const start = this.dateAdapter.createDate(year, 0, 1);
        const end = this.dateAdapter.createDate(year, 11, 31);
        return [start, end];
      }
      case 'Förra veckan': {
        const thisDayLastWeek = this.dateAdapter.addCalendarDays(today, -7);
        return this.calculateWeek(thisDayLastWeek);
      }
      case 'Förra månaden': {
        const thisDayLastMonth = this.dateAdapter.addCalendarMonths(today, -1);
        return this.calculateMonth(thisDayLastMonth);
      }
      case 'Förra året': {
        const start = this.dateAdapter.createDate(year - 1, 0, 1);
        const end = this.dateAdapter.createDate(year - 1, 11, 31);
        return [start, end];
      }
      default:
        console.error(
          'The range is not a custom preset, see calculateDateRange()'
        );
        return rangeName;
    }
  }

  private calculateMonth(forDay: D): [start: D, end: D] {
    const year = this.dateAdapter.getYear(forDay);
    const month = this.dateAdapter.getMonth(forDay);
    const start = this.dateAdapter.createDate(year, month, 1);
    const end = this.dateAdapter.addCalendarDays(
      start,
      this.dateAdapter.getNumDaysInMonth(forDay) - 1
    );
    return [start, end];
  }

  private calculateWeek(forDay: D): [start: D, end: D] {
    const deltaStart =
      this.dateAdapter.getFirstDayOfWeek() -
      this.dateAdapter.getDayOfWeek(forDay);
    const start = this.dateAdapter.addCalendarDays(forDay, deltaStart);
    const end = this.dateAdapter.addCalendarDays(start, 6);
    return [start, end];
  }

  private get today(): D {
    const today = this.dateAdapter.getValidDateOrNull(new Date());
    if (today === null) {
      throw new Error('date creation failed');
    }
    return today;
  }
}
