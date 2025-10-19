import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Team} from '../../../../core/model/teams.model';
import {TwoColumnLayoutComponent} from '../../../../shared/ui/two-column-layout/two-column-layout.component';
import {TeamCardsComponent} from '../../components/team-cards/team-cards.component';
import {TeamDetailsPage} from '../team-details/team-details.page';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,
    TeamCardsComponent,
  ],
  templateUrl: './teams.page.html',
  styleUrl: './teams.page.scss'
})
export class TeamsPage {

  allTeams: Team[] = [
    { id: 't1', name: 'Team 1', description: 'Project name', imageUrl: '/pics/team1.jpg', /*...ostali podaci...*/ },
    { id: 't2', name: 'Team 2', description: 'Project name', imageUrl: 'path/to/team/pic2.jpg', /*...ostali podaci...*/ },
    { id: 't3', name: 'Team 3', description: 'Project name', imageUrl: 'path/to/team/pic3.jpg', /*...ostali podaci...*/ },
  ] as Team[];


}
