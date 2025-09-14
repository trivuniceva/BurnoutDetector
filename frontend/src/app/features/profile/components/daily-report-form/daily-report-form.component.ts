import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {InputComponent} from '../../../../shared/ui/input/input.component';
import {CommonModule} from '@angular/common';
import {RELAXATION_TIPS} from '../../../../data/relaxation-tips';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DailyDataService} from '../../services/daily-data.service';

@Component({
  selector: 'app-daily-report-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,

  ],
  templateUrl: './daily-report-form.component.html',
  styleUrl: './daily-report-form.component.scss'
})
export class DailyReportFormComponent implements OnInit, OnDestroy{
  @Output() formSubmit = new EventEmitter<any>();
  currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  relaxationTips: string[] = RELAXATION_TIPS;

  currentTip: string = "";
  private tipIndex: number = 0;
  private intervalID: any;

  dailyReportForm!: FormGroup;

  dailyFactors = [
    { name: 'workingHours', placeholder: 'Working hours', type: 'number' },
    { name: 'overtimeHours', placeholder: 'Overtime hours', type: 'number' },
    { name: 'stressLevel', placeholder: 'Stress level', type: 'number' }, // promenjeno u number
    { name: 'sleepQuality', placeholder: 'Sleep quality', type: 'text' },
    { name: 'physicalActivity', placeholder: 'Physical activity', type: 'text' },
    { name: 'symptoms', placeholder: 'Symptoms', type: 'text' }
  ];

  constructor(private fb: FormBuilder, private dailyDataService: DailyDataService) { }

  ngOnInit(): void {

    const formControls: { [key: string]: FormControl } = {};
    this.dailyFactors.forEach(factor => {
      formControls[factor.name] = new FormControl('');
    });
    this.dailyReportForm = this.fb.group(formControls);

    this.currentTip = this.relaxationTips[this.tipIndex];

    this.intervalID = setInterval(() => {
      this.changeTip();
      }, 6000
    )
  }

  ngOnDestroy(): void{
    if(this.intervalID){
      clearInterval(this.intervalID);
    }
  }

  changeTip(): void{
    this.tipIndex = (this.tipIndex + 1) % this.relaxationTips.length;
    this.currentTip = this.relaxationTips[this.tipIndex];
  }

  onSubmit() {
    if (this.dailyReportForm.valid) {
      const formValue = this.dailyReportForm.value;

      // Stvori novi Date objekt neposredno prije slanja
      const today = new Date();

      // Koristi toISOString() na novom Date objektu
      const dateForBackend = today.toISOString().split('T')[0];

      // Kreiraj objekt koji prati tvoju backend logiku
      const dailyReportData = {
        employeeId: 123, // Zameni sa pravim ID-jem korisnika
        date: dateForBackend, // Postavi ispravno formatiran datum
        dailyFactors: Object.keys(formValue).map(key => {
          return {
            name: key,
            value: formValue[key]
          };
        })
      };

      // Pozovi backend servis
      this.dailyDataService.processDailyReport(dailyReportData).subscribe(
        response => {
          console.log('Backend response:', response);
        },
        error => {
          console.error('Error submitting data:', error);
        }
      );
    }
  }

}
