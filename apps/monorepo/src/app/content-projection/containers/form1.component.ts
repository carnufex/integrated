import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormContentProjectionComponent } from '../components/form/form.component';
import { Donut } from '../models/donut';
import { FormService } from '../service/form.service';

@Component({
  standalone: true,
  selector: 'integrated-form-container',
  template: `
    <div>
      <ng-container *ngIf="donuts?.length; else nothing">
        <integrated-form-component
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        >
          <h3>Projection 1</h3>
          <a routerLink="2" class="btn btn--green donut-list-actions">
            Form 2
            <img src="../../assets/icon/plus.svg" />
          </a>
        </integrated-form-component>
      </ng-container>
      <ng-template #nothing>
        <p>nothing here</p>
      </ng-template>
    </div>
  `,
  styles: [``],
  imports: [RouterModule, NgIf, NgForOf, FormContentProjectionComponent],
  providers: [FormService],
})
export class FormContainerComponent implements OnInit {
  donuts!: Donut[];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.read().subscribe((donuts: Donut[]) => {
      this.donuts = donuts;
    });
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
