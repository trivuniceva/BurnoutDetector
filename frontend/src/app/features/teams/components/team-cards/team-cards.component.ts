import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Team} from '../../../../core/model/teams.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-cards',
  imports: [
    CommonModule
  ],
  templateUrl: './team-cards.component.html',
  styleUrl: './team-cards.component.scss'
})
export class TeamCardsComponent {
  @Input() team: Team | null = null;

  constructor(private router: Router) {}

  onCardClick(): void {
    if (this.team) {
      this.router.navigate(['/teams', this.team.id]);
    }
  }
}
