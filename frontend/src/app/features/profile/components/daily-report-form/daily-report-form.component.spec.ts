import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportFormComponent } from './daily-report-form.component';

describe('DailyReportFormComponent', () => {
  let component: DailyReportFormComponent;
  let fixture: ComponentFixture<DailyReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyReportFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
