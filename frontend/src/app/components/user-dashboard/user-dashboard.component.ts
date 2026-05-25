import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QRCodeComponent } from 'angularx-qrcode';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule, QRCodeComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  bookings: any[] = [];
  profileForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.profileForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {
    this.loadBookings();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.profileForm.patchValue({ username: user.username });
  }

  loadBookings() {
    this.http.get<any[]>(`${environment.apiUrl}/users/my-bookings`).subscribe(data => this.bookings = data);
  }

  onUpdateProfile() {
    this.http.put(`${environment.apiUrl}/auth/profile`, this.profileForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.snackBar.open('Profilo aggiornato!', 'OK', { duration: 3000 });
      }
    });
  }
}
