import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Sidenav } from '../components/sidenav/sidenav';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    Header,
    Sidenav,
    Footer,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}