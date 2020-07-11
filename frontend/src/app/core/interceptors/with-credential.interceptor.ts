import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WithCredentialInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let queryName = req.body.operationName;
    let includedOperations = ['Login', 'Logout', 'RefreshToken'];
    if (includedOperations.includes(queryName)) {
      const clonedReq = req.clone({
        withCredentials: true
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}

export const WithCredentialInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: WithCredentialInterceptor,
    multi: true
  }
];
