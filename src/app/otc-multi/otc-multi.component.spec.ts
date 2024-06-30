import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcMultiComponent } from './otc-multi.component';

describe('OtcMultiComponent', () => {
  let component: OtcMultiComponent;
  let fixture: ComponentFixture<OtcMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtcMultiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtcMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
