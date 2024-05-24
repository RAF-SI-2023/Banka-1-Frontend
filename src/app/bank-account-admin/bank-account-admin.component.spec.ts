import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountAdminComponent } from './bank-account-admin.component';

describe('BankAccountAdminComponent', () => {
  let component: BankAccountAdminComponent;
  let fixture: ComponentFixture<BankAccountAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankAccountAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
