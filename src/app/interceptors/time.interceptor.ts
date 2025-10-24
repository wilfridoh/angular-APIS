import { HttpContext, HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);  

export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true);
}

@Injectable()
export  class timeInterceptor implements HttpInterceptor {

  constructor() {}
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   throw new Error('Method not implemented.');
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    
    if(request.context.get(CHECK_TIME)){

    
    
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

    return next.handle(request);
  } 
}


