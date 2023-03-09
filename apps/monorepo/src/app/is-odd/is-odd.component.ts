import { Component } from '@angular/core';
import { IsEvenComponent } from '../is-even/is-even.component';

@Component({
  selector: 'integrated-is-odd',
  templateUrl: './is-odd.component.html',
  styleUrls: ['./is-odd.component.scss'],
})
export class IsOddComponent {
  /**
   * isOdd
   */
  public isOdd(x: number): boolean {
    return !IsEvenComponent.isEven(x);
  }
}
