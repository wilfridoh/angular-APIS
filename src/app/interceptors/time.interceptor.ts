import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export  class timeInterceptor implements HttpInterceptor {

  constructor() {}
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   throw new Error('Method not implemented.');
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    const start = performance.now();

    return next
      .handle(request)
      .pipe(
        tap(()=> {
          const time = (performance.now() - start) + 'ms';
          console.log(request.url, time);
        })
      );
  } 
}


