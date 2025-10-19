import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {User} from '../../core/model/user.model';


interface NavItem {
  name: string;
  route?: string;
  iconUrl: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit{
  user: User | null = null;
  // navItems: { name: string; route: string; iconUrl: string }[] = [];
  navItems: NavItem[] = [];

  isTeamsDropdownOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    this.user = userJson ? JSON.parse(userJson) : null;

    const teamDropdown: NavItem = {
      name: 'Teams',
      iconUrl: 'icons/teams.png',
      children: [
        { name: 'Teams', route: '/teams', iconUrl: 'icons/teams.png' },
        { name: 'Add Team', route: '/teams/add', iconUrl: 'icons/add-team.png' },
        { name: 'Add Employee', route: '/employees/add', iconUrl: 'icons/add-user.png' },
      ]
    };

    if (this.user?.userRole === 'ADMINISTRATOR') {
      this.navItems = [
        { name: 'Profile', route: '/profile', iconUrl: 'icons/profile.png' },
        { name: 'Notifications', route: '/notifications', iconUrl: 'icons/bell.png' },
        teamDropdown,
      ];
    } else if (this.user?.userRole === 'MANAGER') {
      this.navItems = [
        { name: 'Profile', route: '/profile', iconUrl: 'icons/profile.png' },
        { name: 'Notifications', route: '/notifications', iconUrl: 'icons/bell.png' },
        teamDropdown,
      ];
    } else if (this.user?.userRole === 'EMPLOYEE') {
      this.navItems = [
        { name: 'Profile', route: '/profile', iconUrl: 'icons/profile.png' },
        { name: 'Notifications', route: '/notifications', iconUrl: 'icons/bell.png' },
      ];
    }
  }

  toggleTeamsDropdown(item: NavItem): void {
    if (item.children) {
      this.isTeamsDropdownOpen = !this.isTeamsDropdownOpen;
    }
  }

}
