import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {}
