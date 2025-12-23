import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDetail } from './progress-detail';

describe('ProgressDetail', () => {
  let component: ProgressDetail;
  let fixture: ComponentFixture<ProgressDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
