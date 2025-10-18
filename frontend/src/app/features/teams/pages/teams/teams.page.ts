import { Component } from '@angular/core';
import {SearchBarComponent} from '../../../../shared/ui/search-bar/search-bar.component';
import {TwoColumnLayoutComponent} from '../../../../shared/ui/two-column-layout/two-column-layout.component';
import {Team} from '../../../../core/model/teams.model';
import {EntityHeaderComponent} from '../../../../shared/ui/entity-header/entity-header.component';
import {CommonModule} from '@angular/common';
import {TeamMemberCardComponent} from '../../components/team-member-card/team-member-card.component';
import {EmployeeDetailsComponent} from '../../components/employee-details/employee-details.component';
import {User} from '../../../../core/model/user.model';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    EntityHeaderComponent,
    TeamMemberCardComponent,
    TwoColumnLayoutComponent,
    EmployeeDetailsComponent,
    EmployeeDetailsComponent,
  ],
  templateUrl: './teams.page.html',
  styleUrl: './teams.page.scss'
})
export class TeamsPage {
  selectedEmployee: User | null = null;

  currentTeam: Team = {
    id: 't1',
    name: 'Team Alpha',
    description: 'Tim zadužen za razvoj frontenda.',
    imageUrl: 'pics/team1.jpg',
    manager: {
      id: 'u101',
      firstName: 'Nikola',
      lastName: 'Milić',
      email: 'nikola.milic@example.com',
      userRole: 'MANAGER',
      imageUrl: 'pics/team1.jpg',
    },
    members: [
      {
        id: 'u201',
        firstName: 'Jovana',
        lastName: 'Petrović',
        email: 'jovana.petrovic@example.com',
        userRole: 'EMPLOYEE',
        imageUrl: 'pics/team1.jpg',
      },
      {
        id: 'u202',
        firstName: 'Marko',
        lastName: 'Jovanović',
        email: 'marko.jovanovic@example.com',
        userRole: 'EMPLOYEE',
        imageUrl: 'pics/team1.jpg',
      },
      {
        id: 'u203',
        firstName: 'Ana',
        lastName: 'Knežević',
        email: 'ana.knezevic@example.com',
        userRole: 'EMPLOYEE',
        imageUrl: 'pics/team1.jpg',
      },
      {
        id: 'u204',
        firstName: 'Stefan',
        lastName: 'Stojanović',
        email: 'stefan.stojanovic@example.com',
        userRole: 'EMPLOYEE',
        imageUrl: 'pics/team1.jpg',
      },
      {
        id: 'u205',
        firstName: 'Milica',
        lastName: 'Pavlović',
        email: 'milica.pavlovic@example.com',
        userRole: 'EMPLOYEE',
        imageUrl: 'pics/team1.jpg',
      }
    ],
  };

  constructor() {}

  onMemberSelected(member: User): void {
    this.selectedEmployee = member;
  }

}
