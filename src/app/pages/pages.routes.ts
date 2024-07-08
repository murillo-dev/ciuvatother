import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((comp) => comp.HomeComponent),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./user/user.component').then((comp) => comp.UserComponent),
  },
];
