import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// import { Sesion } from '../modelos/sesion.model';
// import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  private baseUri: string = 'http://localhost:63421/api/';

  constructor(private http: HttpClient) { }

  // iniciarSesion(nombre: string, clave: string) {
  //   let uri = this.baseUri + 'sesion/iniciar';
  //   // let cuerpo = { Nombre: nombre, Clave: clave };
  //   // console.log(cuerpo);

  //   let sesion = new Sesion();
  //   sesion.Nombre= nombre;
  //   sesion.Clave = clave;
    
  //   // let options = {
  //   //     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  //   // };

  //   // return this.http.post(uri, {Nombre: 'Roberto', Clave: 'queti'});
  //   console.log('[POST] Enviando datos: ' + uri);
  //   return this.http.post<Sesion>(uri, sesion);
  // }

  private isNullOrEmpty(valor: string): boolean {
    let resultado: boolean = false;
    if (valor != null && valor != 'undefined') {
      resultado = true;
    }
    return resultado;
  }

  get<T>(controller: string, action?: string, queryString?: string): Observable<T> {
    console.log('controller: ' + controller + ' | action: ' + action + ' | queryString: ' + queryString)
    let uri = this.baseUri + controller + '/';
    if (this.isNullOrEmpty(action)) {
      uri = uri + action;
    }
    if (this.isNullOrEmpty(queryString)) {
      uri = uri + '?' + queryString;
    }
    console.log('[GET] Solicitando datos: ' + uri);
    return this.http.get<T>(uri);
  }
}
