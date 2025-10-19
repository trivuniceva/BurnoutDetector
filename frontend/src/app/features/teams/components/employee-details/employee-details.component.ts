import {Component, Input} from '@angular/core';
import {User} from '../../../../core/model/user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent {
  @Input() member!: User;

  getRiskColor(riskScore: number | undefined): string {
    if (riskScore === undefined) {
      return '';
    }
    if (riskScore <= 0.4) {
      return 'green';
    } else if (riskScore <= 0.7) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  getFullImageUrl(imageName: string | undefined, type: 'team' | 'user' = 'user'): string {
    if (!imageName) return '/defaultPic.jpg';

    const baseUrl = 'http://localhost:8080';

    if (type === 'team') {
      return `${baseUrl}${imageName}`;
    } else {
      return `${baseUrl}/uploads/profile_pictures/${imageName}`;
    }
  }

  getRiskColorFromLevel(level: string): string {
    switch(level) {
      case 'Nizak': return 'green';
      case 'Srednji': return 'orange';
      case 'Visok': return 'red';
      default: return '';
    }
  }

  getRiskWidthFromLevel(level: string): string {
    switch(level) {
      case 'Nizak': return '33%';
      case 'Srednji': return '66%';
      case 'Visok': return '100%';
      default: return '0%';
    }
  }


  getRoundedSleepHours(): string {
    if (this.member.weeklyReport?.avgSleepHours === undefined) return '-';
    return this.member.weeklyReport.avgSleepHours.toFixed(1);
  }

  getRoundedWorkHours(): string {
    if (this.member.weeklyReport?.avgWorkingHours === undefined) return '-';
    return this.member.weeklyReport.avgWorkingHours.toFixed(1);
  }



}
