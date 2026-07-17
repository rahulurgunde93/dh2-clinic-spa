import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LoginOffice } from '../../data-access/models/login-office.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-office-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './login-office-card.html',
  styleUrls: ['./login-office-card.scss'],
})
export class LoginOfficeCard {
  @Input({ required: true }) office!: LoginOffice;
  @Output() readonly edit = new EventEmitter<LoginOffice>();
  @Output() readonly delete = new EventEmitter<LoginOffice>();
}
