import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersLegalPersonsComponent } from './orders-legal-persons.component';

describe('OrdersLegalPersonsComponent', () => {
  let component: OrdersLegalPersonsComponent;
  let fixture: ComponentFixture<OrdersLegalPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersLegalPersonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersLegalPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
