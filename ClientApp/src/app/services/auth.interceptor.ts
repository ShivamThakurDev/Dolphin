import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('dolphin.accessToken') || localStorage.getItem('token');
    const tenantId = localStorage.getItem('dolphin.tenantId') || localStorage.getItem('tenantId');

    let headers = req.headers;
    // Only attach bearer token if it's a real token and not an auth/login endpoint
    if (token && token !== 'demo-token' && !req.url.includes('/auth/login')) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    if (tenantId) {
      headers = headers.set('X-Tenant-Id', tenantId);
    }

    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          // Unwrap ApiResponse<T> envelope automatically if present
          if (event.body && typeof event.body === 'object' && 'success' in event.body && 'data' in event.body) {
            return event.clone({ body: event.body.data });
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/login')) {
          console.warn('Authentication expired or missing, routing to login:', req.url);
          // Only redirect if not already on login page
          if (!this.router.url.includes('/login')) {
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
