import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {User} from '../../core/model/user.model';

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

  // navItems = [
  //   { name: 'Home', route: '/', iconUrl: 'icons/home.png' },
  //   { name: 'Profile', route: '/profile', iconUrl: 'icons/profile.png' },
  //   { name: 'Notifications', route: '/notifications', iconUrl: 'icons/bell.png' },
  //   { name: 'Teams', route: '/teams', iconUrl: 'icons/teams.png' },
  // ];

  navItems: { name: string; route: string; iconUrl: string }[] = [];


  constructor() { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    this.user = userJson ? JSON.parse(userJson) : null;

    if (this.user?.userRole === 'ADMINISTRATOR') {
      this.navItems = [
        { name: 'Profile', route: '/profile', iconUrl: 'icons/profile.png' },
        { name: 'Notifications', route: '/notifications', iconUrl: 'icons/bell.png' },
        { name: 'Teams', route: '/teams', iconUrl: 'icons/teams.png' },
      ];
    } else if (this.user?.userRole === 'MANAGER') {
      this.navItems = [
        { name: 'Profile', route: '/profile', iconUrl: 'icons/profile.png' },
        { name: 'Notifications', route: '/notifications', iconUrl: 'icons/bell.png' },
        { name: 'Teams', route: '/teams', iconUrl: 'icons/teams.png' },
      ];
    } else if (this.user?.userRole === 'EMPLOYEE') {
      this.navItems = [
        { name: 'Profile', route: '/profile', iconUrl: 'icons/profile.png' },
        { name: 'Notifications', route: '/notifications', iconUrl: 'icons/bell.png' },
      ];
    }
  }

}
