import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../../core/model/user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-team-member-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './team-member-card.component.html',
  styleUrl: './team-member-card.component.scss'
})
export class TeamMemberCardComponent {
  @Input() member!: User;
  @Output() memberSelected = new EventEmitter<User>();

  onCardClick(): void {
    this.memberSelected.emit(this.member);
  }

  getRiskColor(riskScore: number): string {
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




}
