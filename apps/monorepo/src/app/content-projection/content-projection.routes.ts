import { Routes } from '@angular/router';

export const ContentProjectionRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () =>
      import('./containers/form1.component').then(
        (x) => x.FormContainerComponent
      ),
  },
  {
    path: 'form/2',
    loadComponent: () =>
      import('./containers/form2.component').then(
        (x) => x.FormContainerComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form',
  },
];
