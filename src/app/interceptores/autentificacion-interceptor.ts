import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Observable } from 'rxjs';

@Injectable()
export class AutentificacionInterceptor implements HttpInterceptor {

  constructor(
    private sesionService: SesionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('sesion')){
      return next.handle(req);
    }
    let usuario = this.sesionService.obtenerUsuario();
    if (!usuario){
      return next.handle(req);
    }
    let base64 = window.btoa(`${usuario.Nombre}:${usuario.Clave}`)
    let reqClonado = req.clone({
      setHeaders: {    
        Authorization: `Basic ${base64}`  
      }
    });
    return next.handle(reqClonado);
  }
}