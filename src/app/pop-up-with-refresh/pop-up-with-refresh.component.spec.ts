import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpWithRefreshComponent } from './pop-up-with-refresh.component';

describe('PopUpWithRefreshComponent', () => {
  let component: PopUpWithRefreshComponent;
  let fixture: ComponentFixture<PopUpWithRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpWithRefreshComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpWithRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
