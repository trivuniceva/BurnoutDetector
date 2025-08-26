import { Component } from '@angular/core';
import {SearchBarComponent} from '../../../../shared/ui/search-bar/search-bar.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    SearchBarComponent
  ],
  templateUrl: './teams.page.html',
  styleUrl: './teams.page.scss'
})
export class TeamsPage {

}
