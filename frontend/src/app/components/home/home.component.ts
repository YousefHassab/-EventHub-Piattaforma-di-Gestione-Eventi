import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: '<div style="text-align:center; margin-top:50px;"><h1>Benvenuti su EventHub! 🎫</h1><p>Se vedi questo messaggio, l\'app funziona!</p></div>'
})
export class HomeComponent {}
