import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('dolphin.accessToken') || localStorage.getItem('token') || 'demo-token';
    const tenantId = localStorage.getItem('dolphin.tenantId') || localStorage.getItem('tenantId');

    let headers = req.headers;
    if (token) {
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
      })
    );
  }
}
