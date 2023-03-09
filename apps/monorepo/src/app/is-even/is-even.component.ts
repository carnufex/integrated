import { Component } from '@angular/core';

@Component({
  selector: 'integrated-is-even',
  templateUrl: './is-even.component.html',
  styleUrls: ['./is-even.component.scss'],
})
export class IsEvenComponent {

  /**
   * isEven
   */
  public static isEven(x: number): boolean {
    return x % 2 == 0;
  }
}
