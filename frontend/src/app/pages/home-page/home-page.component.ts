import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {InputComponent} from '../../shared/ui/input/input.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgFor,
    InputComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
