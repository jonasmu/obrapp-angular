import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';


@Injectable()
export class SesionService {

  private sesion_item: string = 'sesion';

  constructor(private http: HttpClient) { }

  iniciar(nombre: string, clave: string): Observable<Usuario> {
    let usuario: Usuario = {
      Id: -1,
      Nombre: nombre,
      Clave: clave
    };
    return this.http.post<Usuario>('sesion', usuario);
  }

  cerrar(): void {
    localStorage.removeItem(this.sesion_item);
  }

  guardar(usuario: Usuario): void {
    localStorage.setItem(this.sesion_item, JSON.stringify(usuario))
  }

  obtener(): Usuario {
    return JSON.parse(localStorage.getItem(this.sesion_item))
  }
}
