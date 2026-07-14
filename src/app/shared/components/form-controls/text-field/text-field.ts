import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-field.html',
  styleUrls: ['./text-field.scss'],
})
export class TextField {
  @Input({ required: true })
  label!: string;

  @Input({ required: true })
  control!: FormControl<string>;

  @Input()
  placeholder = '';

@Input()
type: 'text' | 'email' | 'password' = 'text';
}
