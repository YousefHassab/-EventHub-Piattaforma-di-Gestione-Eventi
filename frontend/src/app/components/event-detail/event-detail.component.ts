import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QRCodeModule } from 'angularx-qrcode';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatSnackBarModule, QRCodeModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: any;
  ticketQr: string | null = null;
  baseUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(+id).subscribe(data => this.event = data);
    }
  }

  onBook() {
    this.eventService.bookEvent(this.event.id).subscribe({
      next: (res) => {
        this.ticketQr = res.ticket;
        this.snackBar.open('Iscrizione completata!', 'Chiudi', { duration: 3000 });
        this.event.available_seats -= 1;
      },
      error: (err) => {
        this.snackBar.open(err.error.message || 'Errore durante l\'iscrizione', 'Chiudi', { duration: 3000 });
      }
    });
  }
}
