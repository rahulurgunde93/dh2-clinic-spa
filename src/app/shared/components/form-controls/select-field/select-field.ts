import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './select-field.html',
  styleUrls: ['./select-field.scss'],
})
export class SelectField {
  @Input({ required: true })
  control!: FormControl<string>;

  @Input({ required: true })
  label!: string;

  @Input({ required: true })
  options: SelectOption[] = [];
}
