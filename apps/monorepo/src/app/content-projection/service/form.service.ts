import { Injectable } from '@angular/core';
import { Donut } from '../models/donut';
import { of } from 'rxjs';

@Injectable()
export class FormService {
  private donuts: Donut[] = [
    {
      id: 'abce',
      name: 'Caramel Swirl',
      icon: 'caramel-swirl',
      price: 119,
      description: 'For the pure chocoholic.',
    },
  ];

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    return of(this.donuts);
  }
}
