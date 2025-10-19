import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() period: string = '';
  @Input() risk: number = 0; // vrednost od 0 do 1

  get riskColor(): string {
    let adjustedRisk = this.risk;

    if (this.label.toLowerCase().includes('sleep')) {
      adjustedRisk = 1 - this.risk; // manje sati → veći rizik
    } else if (this.label.toLowerCase().includes('working hours')) {
      if (this.risk <= 0.66) adjustedRisk = 0.2;
      else if (this.risk <= 0.9) adjustedRisk = 0.5;
      else adjustedRisk = 0.85;
    }

    if (adjustedRisk <= 0.3) return 'green';
    else if (adjustedRisk <= 0.7) return 'orange';
    else return 'red';
  }

  getCircleGradient(riskValue: number): string {
    let adjustedRisk = riskValue;
    if (this.label.toLowerCase().includes('sleep')) {
      adjustedRisk = 1 - riskValue;
    } else if (this.label.toLowerCase().includes('working hours')) {
      if (riskValue <= 0.66) adjustedRisk = 0.2;
      else if (riskValue <= 0.9) adjustedRisk = 0.5;
      else adjustedRisk = 0.85;
    }

    const color = this.getRiskColor(adjustedRisk);
    const progressPercentage = (1 - adjustedRisk) * 100;
    const endAngle = progressPercentage * 3.6;

    return `conic-gradient(${color} ${endAngle}deg, #e0e0e0 ${endAngle}deg)`;
  }


  private getRiskColor(riskValue: number): string {
    if (riskValue < 0.3) return 'var(--color-risk-green)';
    if (riskValue <= 0.6) return 'var(--color-risk-orange)';
    return 'var(--color-risk-red)';
  }

}
