import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService, JwtService } from '../../services';
import { Router } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = inject(JwtService).getAccessToken();
  const router = inject(Router);

  if (token == null) {
    return true;
  }

  router.navigate(['']);
  return false;
};
