import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { first, filter, map } from 'rxjs/operators';
import { Url } from '../modelos/url.model';

@Injectable()
export class GlobalService {

  constructor(
    private router: Router,
    private location: Location) { }

  obtenerIdDeUrl(route: ActivatedRoute, parametro: number, validar: boolean = true): number {
    let id: number;
    route.params.subscribe(
      params => id = params[parametro],
      error => {
        id = 0;
        this.notificarError('El id obtenido de la url es inválido');
      }
    );
    return id;
  }

  notificarError(mensaje: string = ''): void {
    alert('Ha ocurrido un error\n' + mensaje);
    this.navegar(Url.raiz);
  }

  volver(): void {
    this.location.back();
  }

  navegar(url: string, ...params: number[]): void {
    url = this.mapearUrl(url, ...params);
    console.log(' ----> Navegando a: ' + url);
    this.router.navigateByUrl(url);
  }

  mapearUrl(url: string, ...params: number[]): string {
    if (params != null && params.length > 0) {
      var regex = /(\/[:\d]+)/g;
      var result;
      let i: number = 0;
      while ((result = regex.exec(url)) !== null) {
        url = url.replace(result[i], `/${params[i]}`);
        i++;
      }
    }
    return url;
  }

  urlIncluye(texto: string): boolean {
    return this.router.url.includes(texto);
  }

  confirmarAccion(mensaje: string): boolean {
    return confirm(mensaje);
  }
}
