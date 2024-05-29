import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsAdminComponent } from './transaction-details-admin.component';

describe('TransactionDetailsAdminComponent', () => {
  let component: TransactionDetailsAdminComponent;
  let fixture: ComponentFixture<TransactionDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
