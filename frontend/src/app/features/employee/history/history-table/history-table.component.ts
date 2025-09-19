import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { HistoryService, DailyRecordDto } from '../../history.service';

export interface DailyRecord {
  id: number;
  date: Date;
  dailyFactors: { name: string; value: string; unit: string }[];
}

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'] // ispravljeno
})
export class HistoryTableComponent implements OnInit, OnChanges {
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;

  historyRecords: DailyRecord[] = [];
  filteredRecords: DailyRecord[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['endDate']) {
      this.filterRecords();
    }
  }

  private loadReports(): void {
    this.historyService.getReports(1).subscribe({
      next: (data: DailyRecordDto[]) => {
        this.historyRecords = data.map(d => ({
          id: d.id,
          date: new Date(d.date),
          dailyFactors: d.dailyFactors
        }));
        console.log(this.historyRecords);
        this.filterRecords();
      },
      error: (err) => console.error('Neuspešno učitavanje istorije:', err)
    });
  }

  private filterRecords(): void {
    this.filteredRecords = this.historyRecords.filter(record => {
      const recordDate = new Date(record.date);
      if (this.startDate && this.endDate) {
        return recordDate >= this.startDate && recordDate <= this.endDate;
      } else if (this.startDate) {
        return recordDate.toDateString() === this.startDate.toDateString();
      }
      return true;
    });
  }

  getFactorValue(record: DailyRecord, factorName: string): string | null {
    const factor = record.dailyFactors.find(f => f.name === factorName);
    return factor ? factor.value : '-';
  }

}
