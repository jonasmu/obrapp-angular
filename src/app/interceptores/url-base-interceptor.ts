import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@entornos/environment'

@Injectable()
export class UrlBaseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlBase = environment.apiUrl + req.url;
    const reqClonado = req.clone({ url: urlBase });
    return next.handle(reqClonado);
  }
}