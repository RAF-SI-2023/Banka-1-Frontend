import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyCreatedUserComponent } from './successfully-created-user.component';

describe('SuccessfullyCreatedUserComponent', () => {
  let component: SuccessfullyCreatedUserComponent;
  let fixture: ComponentFixture<SuccessfullyCreatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessfullyCreatedUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessfullyCreatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
