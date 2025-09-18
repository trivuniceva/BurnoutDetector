import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {TabsComponent} from '../../shared/ui/tabs/tabs.component';
import {StatCardComponent} from '../../shared/ui/stat-card/stat-card.component';
import {DailyReportFormComponent} from './components/daily-report-form/daily-report-form.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {SearchBarComponent} from '../../shared/ui/search-bar/search-bar.component';
import {TwoColumnLayoutComponent} from '../../shared/ui/two-column-layout/two-column-layout.component';
import {EntityHeaderComponent} from '../../shared/ui/entity-header/entity-header.component';
import {User} from '../../shared/user.model';
import {AuthService} from '../../core/auth/auth.service';
import {ProfileService} from './services/profile.service';
import {HistoryTableComponent} from '../employee/history/history-table/history-table.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    DailyReportFormComponent,
    TabsComponent,
    EditProfileComponent,
    SearchBarComponent,
    TwoColumnLayoutComponent,
    EntityHeaderComponent,
    NgIf,
    HistoryTableComponent
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

  statCards = [
    { label: 'Sleep:', value: '3.4', period: 'per week', risk: 0.9 },
    { label: 'Stres:', value: '6.3', period: 'per week', risk: 0.5 },
    { label: 'Working hours:', value: '52', period: 'per week', risk: 0.8 },
    { label: 'Burnout risk:', value: '7.2', period: 'per week', risk: 0.8 },
  ];

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    const user = this.authService.getUser();
    if (user) {
      user.imageUrl = this.authService.getUser().profilePic
        ? this.profileService.getProfilePictureUrl(this.authService.getUser().profilePic)
        : '/assets/images/default-profile.png';
      this.user = user;
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
