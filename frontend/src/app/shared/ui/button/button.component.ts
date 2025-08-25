import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() message: string = "";

}
