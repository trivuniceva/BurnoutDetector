import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {InputComponent} from '../../../../shared/ui/input/input.component';
import {CommonModule} from '@angular/common';
import {RELAXATION_TIPS} from '../../../../data/relaxation-tips';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DailyDataService} from '../../../../core/service/daily-data/daily-data.service';
import {User} from '../../../../core/model/user.model';
import { Validators } from '@angular/forms';
import {BurnoutRisk} from '../../../../core/model/burnout-risk.model';

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
  @Output() formSubmit = new EventEmitter<BurnoutRisk>();
  // currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  currentDate: Date = new Date();

  relaxationTips: string[] = RELAXATION_TIPS;

  currentTip: string = "";
  private tipIndex: number = 0;
  private intervalID: any;

  dailyReportForm!: FormGroup;

  // ako prosirujes nove faktore recimo "energy level" samo prosiri ovu listu
  dailyFactors = [
    { name: 'workingHours', placeholder: 'Working hours', type: 'number', min: 0, max: 24 },
    { name: 'stressLevel', placeholder: 'Stress level (0–10)', type: 'number', min: 0, max: 10 },
    { name: 'sleepHours', placeholder: 'Sleep hours', type: 'number', min: 0, max: 24 },
    { name: 'physicalActivity', placeholder: 'Physical activity', type: 'textarea' },
    { name: 'symptoms', placeholder: 'Symptoms', type: 'textarea' }
  ];


  constructor(private fb: FormBuilder, private dailyDataService: DailyDataService) { }

  ngOnInit(): void {

    const formControls: { [key: string]: any } = {}; // 'any' tip je fleksibilniji
    this.dailyFactors.forEach(factor => {
      let validators = [];

      // Sva numerička polja treba da budu obavezna
      if (factor.type === 'number') {
        validators.push(Validators.required);
      }

      // Dodaj 'min' i 'max' validatore ako su definisani u dailyFactors
      if (factor.min !== undefined) {
        validators.push(Validators.min(factor.min));
      }
      if (factor.max !== undefined) {
        validators.push(Validators.max(factor.max));
      }

      formControls[factor.name] = ['', validators]; // Poveži ime i listu validatora
    });
    this.dailyReportForm = this.fb.group(formControls);

    const today = this.getLocalDateString(this.currentDate);

    this.dailyDataService.getDailyReport(Number(this.user.id), today).subscribe(report => {
      if (report) {
        const reportDate = new Date(report.date).toISOString().split('T')[0];

        console.log(reportDate)
        console.log(today)

        if (reportDate === today) {
          report.dailyFactors.forEach((f: { name: string, value: string | number }) => {
            if (this.dailyReportForm.controls[f.name]) {
              this.dailyReportForm.controls[f.name].setValue(f.value);
            }
          });
        } else {
          this.dailyReportForm.reset();
        }
      } else {
        this.dailyReportForm.reset();
      }
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

  // Pomoćna funkcija za proveru validnosti polja
  isFieldInvalid(field: string): boolean {
    const control = this.dailyReportForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  private getLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
        date: this.getLocalDateString(this.currentDate),
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
        (riskResponse: BurnoutRisk) => {
          console.log('Drools Risk Response:', riskResponse);

          this.formSubmit.emit(riskResponse);

          alert(`Daily report saved. Burnout Risk: ${riskResponse.riskLevel}. Recommendation: ${riskResponse.recommendation}`);
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
