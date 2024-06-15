import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginTransactionDetailsComponent } from './margin-transaction-details.component';

describe('MarginTransactionDetailsComponent', () => {
  let component: MarginTransactionDetailsComponent;
  let fixture: ComponentFixture<MarginTransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarginTransactionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarginTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
