import {Component, Input} from '@angular/core';
import {InputComponent} from '../input/input.component';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent

  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

}
