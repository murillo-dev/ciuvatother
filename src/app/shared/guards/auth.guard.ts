import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService, JwtService } from '../../services';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(JwtService).jwtToken();
  const router = inject(Router);
  const authService = inject(AuthService);
  if (token != null) {
    return authService.validateToken().pipe(
      map((response) => {
        if (response.status == 'success') {
          return true;
        } else {
          router.navigate(['login']);
          return false;
        }
      }),
      catchError((error) => {
        router.navigate(['login']);
        return of(false);
      })
    );
  }

  return router.createUrlTree(['login']);
};
