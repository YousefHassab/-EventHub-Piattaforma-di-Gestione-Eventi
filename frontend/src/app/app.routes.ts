import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  { 
    path: 'organizer', 
    component: OrganizerDashboardComponent, 
    canActivate: [authGuard], 
    data: { roles: ['organizer', 'admin'] } 
  },
  { 
    path: 'create-event', 
    component: EventFormComponent, 
    canActivate: [authGuard], 
    data: { roles: ['organizer', 'admin'] } 
  },
  { path: '**', redirectTo: '' }
];
