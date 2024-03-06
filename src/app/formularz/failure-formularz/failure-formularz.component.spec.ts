import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureFormularzComponent } from './failure-formularz.component';

describe('FailureFormularzComponent', () => {
  let component: FailureFormularzComponent;
  let fixture: ComponentFixture<FailureFormularzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailureFormularzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailureFormularzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
