import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../../../core/model/teams.model';
import { User } from '../../../../core/model/user.model';
import { TwoColumnLayoutComponent } from '../../../../shared/ui/two-column-layout/two-column-layout.component';
import { SearchBarComponent } from '../../../../shared/ui/search-bar/search-bar.component';
import { EntityHeaderComponent } from '../../../../shared/ui/entity-header/entity-header.component';
import { TeamMemberCardComponent } from '../../components/team-member-card/team-member-card.component';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';
import { TeamsService } from '../../../../core/service/teams/teams.service';
import { TabsComponent } from '../../../../shared/ui/tabs/tabs.component';
import { ManagerService } from '../../../../core/service/manager/manager.service';
import { WeeklyReportService } from '../../../../core/service/weekly-report/weekly-report.service';
import { forkJoin } from 'rxjs';
import { startOfWeek, endOfWeek } from 'date-fns';

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
  styleUrls: ['./team-details.page.scss']
})
export class TeamDetailsPage implements OnInit {
  team: Team | null = null;
  selectedEmployee: User & Partial<{
    riskLevel: string;
    avgSleep: number;
    avgStress: number;
    avgWorktime: number;
  }> | null = null;

  loading: boolean = true;
  activeTab = 'Employee';
  tabs = ['Employee', 'Statistic', 'Recommendations'];
  hideSidebar = false;

  teamRiskStats: { low: number; medium: number; high: number } | null = null;

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private managerService: ManagerService,
    private weeklyReportService: WeeklyReportService,
  ) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.loadTeamDetails(teamId);
    }
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
    this.hideSidebar = tab === 'Statistic' || tab === 'Recommendations';

    if (tab === 'Statistic' && !this.teamRiskStats) {
      // Pozivamo samo jednom kada otvorimo tab
      this.loadTeamRiskSummary();
    }
  }

  loadTeamRiskSummary(): void {
    if (!this.teamMembers.length) {
      console.warn('Nema članova tima za izračun statistike.');
      return;
    }

    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

    const requests = this.teamMembers.map(member =>
      this.weeklyReportService.getWeeklyReport(+member.id, weekStart, weekEnd)
    );

    forkJoin(requests).subscribe({
      next: (reports) => {
        this.teamMembers.forEach((member, index) => {
          member.weeklyReport = reports[index];
        });
        this.teamRiskStats = this.calculateTeamRiskStats();
      },
      error: (err) => console.error(err)
    });
  }


  private calculateTeamRiskStats() {
    const stats = { low: 0, medium: 0, high: 0 };
    this.teamMembers.forEach(m => {
      const level = m.weeklyReport?.riskLevel;
      if (level === 'Nizak') stats.low++;
      else if (level === 'Srednji') stats.medium++;
      else if (level === 'Visok') stats.high++;
    });
    return stats;
  }


  loadTeamDetails(id: string): void {
    this.teamsService.getTeamById(id).subscribe({
      next: (teamData) => {
        this.team = teamData;
        this.loading = false;
        console.log('Detalji tima učitani:', teamData);
        this.loadTeamRiskSummary();
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

    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

    // this.weeklyReportService.getWeeklyReport(+member.id, weekStart, weekEnd)
    //   .subscribe({
    //     next: (report) => {
    //       this.selectedEmployee = {
    //         ...member,
    //         riskLevel: report.riskLevel,
    //         avgSleep: report.avgSleepHours,
    //         avgStress: report.avgStressLevel,
    //         avgWorktime: report.avgWorkingHours
    //       };
    //     },
    //     error: (err) => console.error('Greška pri učitavanju pojedinačnog rizika:', err)
    //   });
  }

  get fullTeamImageUrl(): string {
    const baseUrl = 'http://localhost:8080/';
    if (!this.team?.imageUrl) return '/pics/default-team.jpg';
    if (this.team.imageUrl.startsWith('http')) return this.team.imageUrl;
    const cleanedPath = this.team.imageUrl.startsWith('/')
      ? this.team.imageUrl.substring(1)
      : this.team.imageUrl;
    return baseUrl + cleanedPath;
  }

}
