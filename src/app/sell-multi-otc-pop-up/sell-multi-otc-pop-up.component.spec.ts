import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellMultiOtcPopUpComponent } from './sell-multi-otc-pop-up.component';

describe('SellMultiOtcPopUpComponent', () => {
  let component: SellMultiOtcPopUpComponent;
  let fixture: ComponentFixture<SellMultiOtcPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellMultiOtcPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellMultiOtcPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
