import { Component } from '@angular/core';
import {HistoryTableComponent} from '../history-table/history-table.component';
import {CalendarComponent} from '../../../../shared/ui/calendar/calendar.component';

@Component({
  selector: 'app-history-page',
  imports: [
    HistoryTableComponent,
    CalendarComponent
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent {

  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;

  onDateRangeSelected(dateRange: { start: Date | null, end: Date | null }) {
    this.selectedStartDate = dateRange.start;
    this.selectedEndDate = dateRange.end;
    console.log('Selected Start Date:', this.selectedStartDate);
    console.log('Selected End Date:', this.selectedEndDate);
  }
}
