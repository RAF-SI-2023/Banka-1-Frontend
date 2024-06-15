import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginCallPopUpComponent } from './margin-call-pop-up.component';

describe('MarginCallPopUpComponent', () => {
  let component: MarginCallPopUpComponent;
  let fixture: ComponentFixture<MarginCallPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarginCallPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarginCallPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
