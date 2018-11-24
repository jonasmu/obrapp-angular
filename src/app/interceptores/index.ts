/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlBaseInterceptor } from './url-base-interceptor';
import { AutentificacionInterceptor } from './autentificacion-interceptor';
import { LoggerInterceptor } from './logger-interceptor';

/** Http interceptor providers in outside-in order */
export const interceptores = [
  { provide: HTTP_INTERCEPTORS, useClass: AutentificacionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UrlBaseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true }
];