import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureElementComponent } from './failure-element.component';

describe('FailureElementComponent', () => {
  let component: FailureElementComponent;
  let fixture: ComponentFixture<FailureElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailureElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailureElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
