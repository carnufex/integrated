import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { FormService } from './content-projection/service/form.service';

export const appRoutes: Route[] = [
  {
    path: 'content-projection',
    loadChildren: () =>
      import('./content-projection/content-projection.routes').then(
        (x) => x.ContentProjectionRoutes
      ),
    providers: [FormService],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'content-projection',
  },
  {
    path: '**',
    redirectTo: 'content-projection',
  },
];
