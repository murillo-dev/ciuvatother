import { Routes } from '@angular/router';
import { pagesRoutes } from './pages/pages.routes';
import { authGuard } from './shared/guards/auth.guard';
import { isAuthenticatedGuard } from './shared/guards/is-authenticated.guard';


export const routes: Routes = [
  {
    path: 'login',
    // canActivate: [isAuthenticatedGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then(
        (comp) => comp.LoginComponent
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/pages.component').then((comp) => comp.PagesComponent),
    children: pagesRoutes,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
