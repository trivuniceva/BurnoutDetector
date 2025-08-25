import { Component } from '@angular/core';
import {ProfileHeaderComponent} from './components/profile-header/profile-header.component';
import {CommonModule} from '@angular/common';
import {TabsComponent} from '../../shared/ui/tabs/tabs.component';
import {InputComponent} from '../../shared/ui/input/input.component';
import {IconSearchComponent} from '../../shared/ui/icon-search/icon-search.component';
import {StatCardComponent} from '../../shared/ui/stat-card/stat-card.component';
import {DailyReportFormComponent} from './components/daily-report-form/daily-report-form.component';
import {ButtonComponent} from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    DailyReportFormComponent,
    ProfileHeaderComponent,
    TabsComponent,
    InputComponent,
    IconSearchComponent,
    ButtonComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    name: 'Nikolina Triv',
    role: 'Junior Web Dev',
    imageUrl: '/profile-pic.png'
  };

  statCards = [
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.3 },
    { label: 'Stres:', value: '2.3', period: 'per week', risk: 0.7 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
    { label: 'Sleep:', value: '7.2', period: 'per week', risk: 0.8 },
  ];

  tabs = ['My Reports', 'View History', 'Recommendations'];
  activeTab = 'My Reports';

  onDailyReportSubmit(data: any) {
    console.log('Daily report submitted:', data);
  }

}
