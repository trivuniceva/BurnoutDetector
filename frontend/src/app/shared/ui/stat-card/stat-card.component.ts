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
    if (this.risk <= 0.3) {
      return 'green';
    } else if (this.risk <= 0.7) {
      return 'orange';
    } else {
      return 'red';
    }
  }

}
