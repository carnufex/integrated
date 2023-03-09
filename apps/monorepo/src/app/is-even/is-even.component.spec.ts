import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsEvenComponent } from './is-even.component';

describe('IsEvenComponent', () => {
  let component: IsEvenComponent;
  let fixture: ComponentFixture<IsEvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsEvenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IsEvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(IsEvenComponent.isEven(2)).toBeTruthy();
  });
});
