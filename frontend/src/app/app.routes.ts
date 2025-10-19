import { Routes } from '@angular/router';
import {ProfileComponent} from './features/profile/profile.component';
import {LoginComponent} from './features/auth/login/login.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {TeamsPage} from './features/teams/pages/teams/teams.page';
import {TeamDetailsPage} from './features/teams/pages/team-details/team-details.page';
import {AddEmployeeComponent} from './features/teams/components/add-employee/add-employee.component';
import {AddTeamComponent} from './features/teams/components/add-team/add-team.component';

export const routes: Routes = [

  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'teams', component: TeamsPage},
  {path: 'teams/add', component: AddTeamComponent},
  {path: 'employees/add', component: AddEmployeeComponent},
  { path: 'teams/:id', component: TeamDetailsPage },

  {path: '**', redirectTo: ''}
];
