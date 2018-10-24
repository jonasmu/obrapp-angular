import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario.model';

import { Observable, of } from 'rxjs';

@Injectable()
export class UsuariosService {

  private controller: string = 'usuarios';

  constructor() { }

  obtenerTodos(): Observable<Usuario[]> {
    return null;
  }
}
