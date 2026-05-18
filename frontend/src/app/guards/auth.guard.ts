import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const user = localStorage.getItem('user');
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getRole();

  if (expectedRoles && !expectedRoles.includes(userRole)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
