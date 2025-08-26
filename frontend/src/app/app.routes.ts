import { Routes } from '@angular/router';
import {ProfileComponent} from './features/profile/profile.component';
import {LoginComponent} from './features/auth/login/login.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {TeamsPage} from './features/teams/pages/teams/teams.page';

export const routes: Routes = [

  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'teams', component: TeamsPage},




  {path: '**', redirectTo: ''}
];
