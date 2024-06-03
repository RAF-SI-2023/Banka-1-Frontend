import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcCustomerComponent } from './otc.component';

describe('OtcComponent', () => {
  let component: OtcCustomerComponent;
  let fixture: ComponentFixture<OtcCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtcCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtcCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
