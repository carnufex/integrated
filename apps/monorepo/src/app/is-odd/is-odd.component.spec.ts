import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsOddComponent } from './is-odd.component';

describe('IsOddComponent', () => {
  let component: IsOddComponent;
  let fixture: ComponentFixture<IsOddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsOddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IsOddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.isOdd(1)).toBeTruthy();
  });
});
