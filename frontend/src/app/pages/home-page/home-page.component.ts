import { Component } from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
