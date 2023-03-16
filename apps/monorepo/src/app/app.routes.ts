import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { ActivityService } from './activity-module/service/activity.service';
import { FormService } from './content-projection/service/form.service';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'activity',
  },
  {
    path: 'content-projection',
    loadChildren: () =>
      import('./content-projection/content-projection.routes').then(
        (x) => x.ContentProjectionRoutes
      ),
    providers: [FormService],
  },
  {
    path: 'activity',
    loadComponent: () =>
      import('./activity-module/containers/body/body.component').then(
        (x) => x.TableBodyComponent
      ),
    providers: [importProvidersFrom(HttpClientModule), ActivityService],
  },

  {
    path: '**',
    redirectTo: 'content-projection',
  },
];
