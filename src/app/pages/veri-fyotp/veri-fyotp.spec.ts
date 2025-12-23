import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeriFyotp } from './veri-fyotp';

describe('VeriFyotp', () => {
  let component: VeriFyotp;
  let fixture: ComponentFixture<VeriFyotp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeriFyotp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeriFyotp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
