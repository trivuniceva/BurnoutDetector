import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {TabsComponent} from '../../shared/ui/tabs/tabs.component';
import {StatCardComponent} from '../../shared/ui/stat-card/stat-card.component';
import {DailyReportFormComponent} from './components/daily-report-form/daily-report-form.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {EntityHeaderComponent} from '../../shared/ui/entity-header/entity-header.component';
import {User} from '../../shared/user.model';
import {AuthService} from '../../core/auth/auth.service';
import {ProfileService} from './services/profile.service';
import {RecommendationCardComponent} from '../employee/history/recommendation-card/recommendation-card.component';
import {HistoryPageComponent} from '../employee/history/history-page/history-page.component';
import {WeeklyReportService} from './services/weekly-report.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    DailyReportFormComponent,
    TabsComponent,
    EditProfileComponent,
    EntityHeaderComponent,
    NgIf,
    HistoryPageComponent,
    RecommendationCardComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  user: User | null = null;
  showEditPopup: boolean = false;

  activeTab = 'My Reports';
  tabs = ['My Reports', 'View History', 'Recommendations'];
  hideSidebar = false;

  recommendations: any[] = [];
  statCards: { label: string; value: string; period: string; risk: number }[] = [];

  constructor(
    private authService: AuthService,
    private weeklyReport: WeeklyReportService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.recommendations = [
      {
        "title": "Analiza stresa",
        "text": "Vaš nivo stresa je u porastu poslednje 4 nedelje...",
        "riskLevel": "high"
      },
      {
        "title": "Upozorenje: San i radni sati",
        "text": "U tri uzastopna dana zabeležen je pad koncentracije i umor...",
        "riskLevel": "high"
      },
      {
        "title": "Radna ravnoteža",
        "text": "Primetan je trend prekovremenog rada u poslednjih mesec dana...",
        "riskLevel": "medium"
      },
      {
        "title": "Pozitivna povratna informacija",
        "text": "Vaši izveštaji pokazuju visok nivo angažovanosti...",
        "riskLevel": "low"
      },
      {
        "title": "Fizički simptomi",
        "text": "Prijavili ste glavobolje i bol u leđima više puta...",
        "riskLevel": "medium"
      },
      {
        "title": "Zdravlje i blagostanje",
        "text": "Prosečan kvalitet sna i nivo stresa su stabilni...",
        "riskLevel": "low"
      }
    ];

    this.user = this.authService.getUser();

    const user = this.authService.getUser();
    if (user) {
      user.imageUrl = this.authService.getUser().profilePic
        ? this.profileService.getProfilePictureUrl(this.authService.getUser().profilePic)
        : '/assets/images/default-profile.png';
      this.user = user;
    }

    if(user.id){
      this.weeklyReport.getWeeklyReport(user.id).subscribe({
        next: (report) => {
          this.statCards = [
            { label: 'Sleep:', value: report.sleep?.toFixed(1) ?? '0.0', period: 'per week', risk: report.riskLevel ?? 0 },
            { label: 'Stress:', value: report.avgStressLevel?.toFixed(1) ?? '0.0', period: 'per week', risk: report.riskLevel ?? 0 },
            { label: 'Working hours:', value: report.avgWorkingHours?.toFixed(1) ?? '0.0', period: 'per week', risk: report.riskLevel ?? 0 },
            { label: 'Burnout risk:', value: (report.riskLevel ? report.riskLevel*10 : 0).toFixed(1), period: 'per week', risk: report.riskLevel ?? 0 },
          ];

          this.recommendations = report.recommendations;
          console.log(this.statCards);
        },
        error: (err) => {
          console.error('Greška pri učitavanju izveštaja', err);
        }
      });
    }

  }

  onTabChange(tab: string) {
    this.activeTab = tab;
    this.hideSidebar = tab === 'View History' || tab === 'Recommendations';
  }


  openEditPopup() {
    this.showEditPopup = true;
  }

  closeEditPopup() {
    this.showEditPopup = false;
  }

  onDailyReportSubmit(data: any) {
    console.log('Daily report submitted:', data);
  }

}
