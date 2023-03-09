import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Donut } from '../../models/donut';

@Component({
  selector: 'integrated-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormContentProjectionComponent {
  @Input() donut!: Donut;
}
