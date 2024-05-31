import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinLegalPersonAndCustomerPopUpComponent } from './join-legal-person-and-customer-pop-up.component';

describe('JoinLegalPersonAndCustomerPopUpComponent', () => {
  let component: JoinLegalPersonAndCustomerPopUpComponent;
  let fixture: ComponentFixture<JoinLegalPersonAndCustomerPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinLegalPersonAndCustomerPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinLegalPersonAndCustomerPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
