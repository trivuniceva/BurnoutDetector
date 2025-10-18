import {Component, Input} from '@angular/core';
import {User} from '../../../../core/model/user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent {
  @Input() member!: User;

  getRiskColor(riskScore: number | undefined): string {
    if (riskScore === undefined) {
      return '';
    }
    if (riskScore <= 0.4) {
      return 'green';
    } else if (riskScore <= 0.7) {
      return 'orange';
    } else {
      return 'red';
    }
  }

}
