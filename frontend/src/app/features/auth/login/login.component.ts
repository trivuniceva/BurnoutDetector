import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {InputComponent} from '../../../shared/ui/input/input.component';
import {ButtonComponent} from '../../../shared/ui/button/button.component';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService){}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Login successful');
      },
      error: () => {
        alert("Invalid email or password");
      }
    });
  }
}
