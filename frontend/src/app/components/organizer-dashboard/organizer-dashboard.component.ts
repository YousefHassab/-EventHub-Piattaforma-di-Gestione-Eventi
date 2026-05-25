import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, CurrencyPipe],
  templateUrl: './organizer-dashboard.component.html',
  styles: [`
    .dashboard-container { padding: 20px; max-width: 1200px; margin: auto; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .stat-card { text-align: center; padding: 20px; background: #e3f2fd; border-radius: 12px; }
    .stat-value { font-size: 2.5em; font-weight: bold; color: #1976d2; }
    table { width: 100%; background: white; border-radius: 8px; overflow: hidden; }
    .error-msg { color: #d32f2f; text-align: center; padding: 20px; font-weight: bold; }
  `]
})
export class OrganizerDashboardComponent implements OnInit {
  stats: any[] = [];
  totalIscritti: number = 0;
  isLoading = true;
  errorMessage = '';
  displayedColumns: string[] = ['titolo', 'iscritti', 'incasso', 'rating', 'azioni'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.http.get<any[]>(`${environment.apiUrl}/events/organizer/stats`).subscribe({
      next: (data) => {
        this.stats = data;
        this.totalIscritti = data.reduce((acc, curr) => acc + curr.iscritti, 0);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Errore stats:', err);
        this.isLoading = false;
        this.errorMessage = err.status === 401 ? 'Sessione scaduta. Rifai il login.' : 'Errore nel caricamento dati.';
      }
    });
  }

  exportCSV(eventId: number) {
    const evento = this.stats.find(e => e.id === eventId);
    if (!evento) return;
    
    // Creazione del contenuto CSV
    const csvContent = "data:text/csv;charset=utf-8,ID,Titolo,Iscritti,Incasso,Rating\n" 
      + `${evento.id},${evento.titolo},${evento.iscritti},${evento.incasso_stimato},${evento.rating_medio}`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `report_evento_${evento.titolo.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
