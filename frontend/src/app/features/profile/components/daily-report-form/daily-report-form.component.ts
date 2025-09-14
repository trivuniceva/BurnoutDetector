import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {InputComponent} from '../../../../shared/ui/input/input.component';
import {CommonModule} from '@angular/common';
import {RELAXATION_TIPS} from '../../../../data/relaxation-tips';

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
export class DailyReportFormComponent implements OnInit, OnDestroy{
  @Output() formSubmit = new EventEmitter<any>();
  currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  relaxationTips: string[] = RELAXATION_TIPS;

  currentTip: string = "";
  private tipIndex: number = 0;
  private intervalID: any;

  ngOnInit(): void {
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
    const formData = {
      // Ovde bi se prikupili podaci iz forme
    };
    this.formSubmit.emit(formData);
  }

}
