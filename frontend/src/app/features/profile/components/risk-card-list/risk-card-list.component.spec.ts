import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCardListComponent } from './risk-card-list.component';

describe('RiskCardListComponent', () => {
  let component: RiskCardListComponent;
  let fixture: ComponentFixture<RiskCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
