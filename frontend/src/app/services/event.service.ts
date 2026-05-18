import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/events`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/events/${id}`);
  }

  createEvent(eventData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/events`, eventData);
  }

  // Metodo per iscriversi a un evento
  bookEvent(eventId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/book/${eventId}`, {});
  }
}
