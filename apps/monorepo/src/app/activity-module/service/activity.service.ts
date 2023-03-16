import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, delay, of, retryWhen, take, tap, throwError } from 'rxjs';

import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private activites: Activity[] = [];

  constructor(private http: HttpClient) {}

  getActivities() {
    if (this.activites.length) {
      return of(this.activites);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    headers.append('api-token', '1234qwer');

    const options = {
      headers,
    };

    return this.http.get<Activity[]>('./assets/data.json', options).pipe(
      tap((activities) => {
        this.activites = activities;
      }),
      retryWhen((errors) => errors.pipe(delay(5000), take(2))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // client-side
      console.warn('client', err.message);
    } else {
      // server-side
      console.warn('server', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
