import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContentProjectionComponent } from './form.component';

describe('FormContentProjectionComponent', () => {
  let component: FormContentProjectionComponent;
  let fixture: ComponentFixture<FormContentProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContentProjectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormContentProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
