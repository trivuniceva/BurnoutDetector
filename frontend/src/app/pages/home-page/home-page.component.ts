import { Component } from '@angular/core';
import {InputComponent} from '../../shared/ui/input/input.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    InputComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
