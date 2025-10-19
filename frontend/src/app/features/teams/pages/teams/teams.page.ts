import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCardsComponent} from '../../components/team-cards/team-cards.component';
import {TeamsService} from '../../../../core/service/teams/teams.service';
import {TabsComponent} from '../../../../shared/ui/tabs/tabs.component';

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
export class TeamsPage implements OnInit{

  allTeams: any[] = [];
  loading: boolean = true;


  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamsService.getAllTeams().subscribe({
      next: (teams) => {
        this.allTeams = teams;
        this.loading = false;
        console.log('Učitani timovi:', teams);
      },
      error: (error) => {
        console.error('Greška pri učitavanju timova:', error);
        this.loading = false;
      }
    });
  }



}
