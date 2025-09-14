import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {InputComponent} from '../../../../shared/ui/input/input.component';
import {CommonModule} from '@angular/common';
import {RELAXATION_TIPS} from '../../../../data/relaxation-tips';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DailyDataService} from '../../services/daily-data.service';
import {User} from '../../../../shared/user.model';
import { Validators } from '@angular/forms';

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
  @Input() user!: User;
  @Output() formSubmit = new EventEmitter<any>();
  // currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  currentDate: Date = new Date();

  relaxationTips: string[] = RELAXATION_TIPS;

  currentTip: string = "";
  private tipIndex: number = 0;
  private intervalID: any;

  dailyReportForm!: FormGroup;

  // ako prosirujes nove faktore recimo "energy level" samo prosiri ovu listu
  dailyFactors = [
    { name: 'workingHours', placeholder: 'Working hours', type: 'number' },
    { name: 'stressLevel', placeholder: 'Stress level (0–10)', type: 'number', min: 0, max: 10 },
    { name: 'sleepQuality', placeholder: 'Sleep quality', type: 'textarea' },
    { name: 'physicalActivity', placeholder: 'Physical activity', type: 'textarea' },
    { name: 'symptoms', placeholder: 'Symptoms', type: 'textarea' }
  ];


  constructor(private fb: FormBuilder, private dailyDataService: DailyDataService) { }

  ngOnInit(): void {

    const formControls: { [key: string]: FormControl } = {};
    this.dailyFactors.forEach(factor => {
      if (factor.name === 'stressLevel') {
        formControls[factor.name] = new FormControl('', [
          Validators.min(0),
          Validators.max(10)
        ]);
      } else {
        formControls[factor.name] = new FormControl('');
      }
    });
    this.dailyReportForm = this.fb.group(formControls);

    const today = this.currentDate.toISOString().split('T')[0];

    this.dailyDataService.getDailyReport(Number(this.user.id), today).subscribe(report => {
      if (report) {
        report.dailyFactors.forEach((f: { name: string, value: string | number }) => {
          if (this.dailyReportForm.controls[f.name]) {
            this.dailyReportForm.controls[f.name].setValue(f.value);
          }
        });
      }
      console.log(report.dailyFactors[0])
    });


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

      console.log(this.dailyReportForm.value)
      console.log(" - - - - - - ")
      console.log(this.user.id)
      console.log(Number(this.user.id))

      const dailyReportData = {
        employeeId: Number(this.user.id),
        date: this.currentDate.toISOString().split('T')[0],
        dailyFactors: Object.keys(formValue).map(key => {
          let value = formValue[key];

          const factorType = this.dailyFactors.find(f => f.name === key);
          if (factorType && factorType.type === 'number') {
            value = +value;
            if (isNaN(value)) {
              value = 0;
            }
          }
          return {
            name: key,
            value: value
          };
        })
      };

      this.dailyDataService.processDailyReport(dailyReportData).subscribe(
        response => {
          console.log('Backend response:', response);
          alert("Thank you! You have successfully submitted your daily report.");
          this.dailyReportForm.reset();
        },
        error => {
          console.error('Error submitting data:', error);
          alert("An error occurred while submitting the data. Please try again.");
        }
      );
    }
  }

}
