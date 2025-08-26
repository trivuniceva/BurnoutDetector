import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsPage } from './team-details.page';

describe('TeamDetailsPageComponent', () => {
  let component: TeamDetailsPage;
  let fixture: ComponentFixture<TeamDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
