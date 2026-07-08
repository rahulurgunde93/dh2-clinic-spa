import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-panel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './error-panel.html',
  styleUrls: ['./error-panel.scss'],
})
export class ErrorPanel {
  @Input() message = 'Something went wrong.';
}
