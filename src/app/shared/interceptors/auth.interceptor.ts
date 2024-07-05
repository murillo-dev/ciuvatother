import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../../services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.indexOf('login') > 0) {
    return next(req);
  }

  const token = inject(JwtService).getAccessToken();
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(cloneRequest);
};
