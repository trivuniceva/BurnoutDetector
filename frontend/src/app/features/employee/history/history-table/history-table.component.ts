import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';

export interface DailyRecord {
  id: number;
  date: Date;
  workingHours: number;
  stressLevel: 'Low' | 'Medium' | 'High';
  symptoms: string;
  sleepHours: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [
    NgIf,
    CommonModule
  ],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss'
})
export class HistoryTableComponent implements OnInit{
  historyRecords: DailyRecord[] = [];

  constructor() { }

  ngOnInit(): void {
    this.historyRecords = this.getMockData();
  }

  getRiskClass(riskLevel: string): string {
    return `${riskLevel}-risk`;
  }

  private getMockData(): DailyRecord[] {
    return [
      {
        id: 1,
        date: new Date('2025-09-15'),
        workingHours: 8,
        stressLevel: 'Low',
        symptoms: 'None',
        sleepHours: 7,
        riskLevel: 'low',
        recommendation: 'Good job, keep it up.'
      },
      {
        id: 2,
        date: new Date('2025-09-16'),
        workingHours: 10,
        stressLevel: 'Medium',
        symptoms: 'Fatigue',
        sleepHours: 5,
        riskLevel: 'medium',
        recommendation: 'Consider reducing working hours. Take a short break.'
      },
      {
        id: 3,
        date: new Date('2025-09-17'),
        workingHours: 11,
        stressLevel: 'High',
        symptoms: 'Fatigue, Headache, Anxiety',
        sleepHours: 4,
        riskLevel: 'high',
        recommendation: 'Urgent action is required. Talk to your manager and schedule a meeting with HR.'
      },
      {
        id: 4,
        date: new Date('2025-09-18'),
        workingHours: 9,
        stressLevel: 'Medium',
        symptoms: 'Irritability',
        sleepHours: 6,
        riskLevel: 'medium',
        recommendation: 'Try to get more rest and plan your tasks better.'
      }
    ];
  }

}
