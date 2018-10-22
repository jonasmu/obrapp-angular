import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

import { Usuario } from '../modelos/usuario.model';

import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class UsuariosService {

  private controller: string = 'usuarios';

  constructor(private api: ApiService) { }

  obtenerTodos(): Observable<Usuario[]> {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Obteniendo usuarios...');
    let usuarios = this.api.get<Usuario[]>(this.controller);
    console.log(usuarios);
    return usuarios;
    // return this.http.get<Usuario>(this.usuariosUrl);
  }
}
