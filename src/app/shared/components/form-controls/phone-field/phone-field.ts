import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-phone-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './phone-field.html',
  styleUrls: ['./phone-field.scss'],
})
export class PhoneField {
  @Input({ required: true })
  control!: FormControl<string>;

  @Input()
  label = 'Phone';

  @Input()
  placeholder = '0401234567';
}
