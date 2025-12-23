import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogetPass } from './foget-pass';

describe('FogetPass', () => {
  let component: FogetPass;
  let fixture: ComponentFixture<FogetPass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FogetPass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FogetPass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
