import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div style="padding: 20px; max-width: 1200px; margin: auto;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background-color: #f5f5f5; }
  `]
})
export class AppComponent {}
