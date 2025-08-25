import { Routes } from '@angular/router';
import {ProfileComponent} from './features/profile/profile.component';
import {LoginComponent} from './features/auth/login/login.component';

export const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
];
