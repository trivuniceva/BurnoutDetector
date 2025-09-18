import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatCardModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  @Output() dateRangeSelected = new EventEmitter<{ start: Date | null, end: Date | null }>();
  selected: Date | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  onDateClick(date: Date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else if (date > this.startDate) {
      this.endDate = date;
      this.dateRangeSelected.emit({ start: this.startDate, end: this.endDate });
    } else {
      this.startDate = date;
      this.endDate = null;
    }
    this.cdr.markForCheck();
  }

  getDateClass(date: Date) {
    if (!date) return '';
    if (this.startDate && this.endDate) {
      if (date > this.startDate && date < this.endDate) return 'in-range';
      if (date.getTime() === this.startDate.getTime()) return 'start-date';
      if (date.getTime() === this.endDate.getTime()) return 'end-date';
    } else if (this.startDate && date.getTime() === this.startDate.getTime()) {
      return 'start-date';
    }
    return '';
  }
}
