import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
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
    MatCardModule,
    NgFor,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  hoveredDate: Date | null = null;

  @Output() dateRangeSelected = new EventEmitter<{ start: Date | null, end: Date | null }>();
  currentMonth: Date = new Date();
  datesInMonth: Date[] = [];
  today: Date = new Date(); // Added this property
  firstDayOfWeek: number = 0; // Added this property

  constructor() {}

  ngOnInit(): void {
    this.updateCalendar();
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.updateCalendar();
  }

  updateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.firstDayOfWeek = firstDay.getDay(); // Sunday is 0, Monday is 1, etc.

    this.datesInMonth = [];
    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      this.datesInMonth.push(new Date(year, month, day));
    }
  }

  isSameDay(d1: Date, d2: Date | null): boolean {
    if (!d2) return false;
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  isInRange(date: Date): boolean {
    if (!this.startDate) return false;

    if (this.startDate && !this.endDate && this.hoveredDate) {
      const [start, end] = this.startDate < this.hoveredDate ?
        [this.startDate, this.hoveredDate] :
        [this.hoveredDate, this.startDate];
      return date >= start && date <= end;
    }

    if (this.startDate && this.endDate) {
      return date >= this.startDate && date <= this.endDate;
    }

    return this.isSameDay(date, this.startDate);
  }

  onDateClick(date: Date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else if (!this.endDate) {
      this.endDate = date;
      if (this.endDate < this.startDate) {
        [this.startDate, this.endDate] = [this.endDate, this.startDate];
      }
      this.dateRangeSelected.emit({ start: this.startDate, end: this.endDate });
    }
  }

  onDateHover(date: Date) {
    if (this.startDate && !this.endDate) {
      this.hoveredDate = date;
    }
  }

  getFormattedDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
