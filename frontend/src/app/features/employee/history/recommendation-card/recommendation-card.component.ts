import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-recommendation-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './recommendation-card.component.html',
  styleUrl: './recommendation-card.component.scss'
})
export class RecommendationCardComponent {
  @Input() recommendation: any;

  getRiskClass(): string {
    const risk = this.recommendation.riskLevel?.toLowerCase();
    switch (risk) {
      case 'nizak':
        return 'low-risk';
      case 'srednji':
        return 'medium-risk';
      case 'visok':
        return 'high-risk';
      default:
        return '';
    }
  }

}
