import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {InputComponent} from '../../../../shared/ui/input/input.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-daily-report-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './daily-report-form.component.html',
  styleUrl: './daily-report-form.component.scss'
})
export class DailyReportFormComponent {
  @Output() formSubmit = new EventEmitter<any>();
  currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  onSubmit() {
    const formData = {
      // Ovde bi se prikupili podaci iz forme
    };
    this.formSubmit.emit(formData);
  }

}
