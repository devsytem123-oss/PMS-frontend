import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneDetail } from './milestone-detail';

describe('MilestoneDetail', () => {
  let component: MilestoneDetail;
  let fixture: ComponentFixture<MilestoneDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilestoneDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestoneDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
