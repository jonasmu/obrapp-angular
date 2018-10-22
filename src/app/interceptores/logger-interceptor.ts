import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
 
    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          event => ok = event instanceof HttpResponse ? 'satifactorio (' + event.status + '),' : '',
          error => ok = 'fallo (' + error.msg + '),'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `[${req.method}] "${req.urlWithParams}" ${ok} en ${elapsed} ms.`;
          console.log(msg);
        })
      );
  }
}