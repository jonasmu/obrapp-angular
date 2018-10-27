import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';


@Injectable()
export class SesionService {

  private sesion_item: string;
  private sujeto: Subject<Usuario>;
  private usuario: Usuario;

  constructor(private http: HttpClient) {
    this.sesion_item = 'sesion';
    this.sujeto = new Subject<Usuario>();
  }

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
    this.establecerUsuarioObservado(null);
  }

  guardar(usuario: Usuario): void {
    localStorage.setItem(this.sesion_item, JSON.stringify(usuario));
    this.establecerUsuarioObservado(usuario);
  }

  obtenerUsuario(): Usuario {
    let item = localStorage.getItem(this.sesion_item);
    return JSON.parse(item);
  }

  observarUsuario(): Observable<Usuario> {
    return this.sujeto.asObservable();
  }

  establecerUsuarioObservado(usuario: Usuario): void {
    this.sujeto.next(usuario);
  }
}
