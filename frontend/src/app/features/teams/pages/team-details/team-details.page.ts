import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../../../core/model/teams.model';
import { User } from '../../../../core/model/user.model';
import { TwoColumnLayoutComponent } from '../../../../shared/ui/two-column-layout/two-column-layout.component';
import { SearchBarComponent } from '../../../../shared/ui/search-bar/search-bar.component';
import { EntityHeaderComponent } from '../../../../shared/ui/entity-header/entity-header.component';
import { TeamMemberCardComponent } from '../../components/team-member-card/team-member-card.component';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';
import {TeamsService} from '../../../../core/service/teams/teams.service';
import {TabsComponent} from '../../../../shared/ui/tabs/tabs.component';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [
    CommonModule,
    TwoColumnLayoutComponent,
    SearchBarComponent,
    EntityHeaderComponent,
    TeamMemberCardComponent,
    EmployeeDetailsComponent,
    TabsComponent
  ],
  templateUrl: './team-details.page.html',
  styleUrl: './team-details.page.scss'
})
export class TeamDetailsPage implements OnInit{
  team: any | null = null;
  selectedEmployee: User | null = null;
  loading: boolean = true;

  activeTab = 'Employee';
  tabs = ['Employee', 'Statistic', 'Recommendations'];
  hideSidebar = false;

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService
    ) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('id');

    if (teamId) {
      this.loadTeamDetails(teamId);
    } else {
      console.error('ID tima nije pronađen u ruti.');
      this.loading = false;
    }
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
    this.hideSidebar = tab === 'Statistic' || tab === 'Recommendations';
  }

  loadTeamDetails(id: string): void {
    this.teamsService.getTeamById(id).subscribe({
      next: (teamData) => {
        this.team = teamData;
        this.loading = false;
        console.log('Detalji tima učitani:', teamData);
      },
      error: (error) => {
        console.error('Greška pri učitavanju detalja tima:', error);
        this.loading = false;
        alert('Nije moguće učitati detalje tima.');
      }
    });
  }

  get teamMembers(): User[] {
    return this.team?.members ?? [];
  }

  onMemberSelected(member: User): void {
    this.selectedEmployee = member;
  }

  private getTeamById(id: string): Team | null {
    const teams: Team[] = [
      {
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
          { id: 'u201', firstName: 'Jovana', lastName: 'Petrović', email: 'jovana.petrovic@example.com', userRole: 'EMPLOYEE', imageUrl: 'pics/team1.jpg' },
          { id: 'u202', firstName: 'Marko', lastName: 'Jovanović', email: 'marko.jovanovic@example.com', userRole: 'EMPLOYEE', imageUrl: 'pics/team1.jpg' },
          { id: 'u203', firstName: 'Ana', lastName: 'Knežević', email: 'ana.knezevic@example.com', userRole: 'EMPLOYEE', imageUrl: 'pics/team1.jpg' },
          { id: 'u204', firstName: 'Stefan', lastName: 'Stojanović', email: 'stefan.stojanovic@example.com', userRole: 'EMPLOYEE', imageUrl: 'pics/team1.jpg' },
          { id: 'u205', firstName: 'Milica', lastName: 'Pavlović', email: 'milica.pavlovic@example.com', userRole: 'EMPLOYEE', imageUrl: 'pics/team1.jpg' }
        ]
      },
      {
        id: 't2',
        name: 'Team Beta',
        description: 'Tim zadužen za backend.',
        imageUrl: 'path/to/team/pic2.jpg',
        manager: {
          id: 'u102',
          firstName: 'Ana',
          lastName: 'Petrović',
          email: 'ana.petrovic@example.com',
          userRole: 'MANAGER',
          imageUrl: 'path/to/team/pic2.jpg',
        },
        members: []
      },
      {
        id: 't3',
        name: 'Team Gamma',
        description: 'Tim zadužen za QA.',
        imageUrl: 'path/to/team/pic3.jpg',
        manager: {
          id: 'u103',
          firstName: 'Marko',
          lastName: 'Jovanović',
          email: 'marko.jovanovic@example.com',
          userRole: 'MANAGER',
          imageUrl: 'path/to/team/pic3.jpg',
        },
        members: []
      }
    ];

    return teams.find(t => t.id === id) ?? null;
  }

  get fullTeamImageUrl(): string {
    const baseUrl = 'http://localhost:8080/';

    if (!this.team?.imageUrl) {
      return '/pics/default-team.jpg';
    }

    if (this.team.imageUrl.startsWith('http')) {
      return this.team.imageUrl;
    }

    const cleanedPath = this.team.imageUrl.startsWith('/')
      ? this.team.imageUrl.substring(1)
      : this.team.imageUrl;

    const fullUrl = baseUrl + cleanedPath;
    console.log('🔗 URL slike tima:', fullUrl);
    return fullUrl;
  }


}
