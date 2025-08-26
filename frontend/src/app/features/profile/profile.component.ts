import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from '../../shared/ui/tabs/tabs.component';
import {StatCardComponent} from '../../shared/ui/stat-card/stat-card.component';
import {DailyReportFormComponent} from './components/daily-report-form/daily-report-form.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {SearchBarComponent} from '../../shared/ui/search-bar/search-bar.component';
import {TwoColumnLayoutComponent} from '../../shared/ui/two-column-layout/two-column-layout.component';
import {EntityHeaderComponent} from '../../shared/ui/entity-header/entity-header.component';

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
    EntityHeaderComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  showEditPopup: boolean = false;

  user = {
    name: 'Nikolina Triv',
    role: 'Junior Web Dev',
    imageUrl: '/profile-pic.png'
  };

  activeTab = 'My Reports';
  tabs = ['My Reports', 'View History', 'Recommendations'];

  statCards = [
    { label: 'Sleep:', value: '3.4', period: 'per week', risk: 0.9 },
    { label: 'Stres:', value: '6.3', period: 'per week', risk: 0.5 },
    { label: 'Sleep:', value: '6.2', period: 'per week', risk: 0.6 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
  ];

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
