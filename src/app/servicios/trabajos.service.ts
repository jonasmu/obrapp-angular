import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Trabajo } from '../modelos/trabajo.model';
import { TrabajoTipo } from '../modelos/trabajo-tipo.model';
import { Estado } from '../modelos/estado.model';

@Injectable()
export class TrabajosService {

  constructor(
    private http: HttpClient) { }

  obtenerPorUsuario(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>('trabajos');
  }

  crear(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.post<Trabajo>('trabajos', trabajo);
  }

  obtenerTipos(): Observable<TrabajoTipo[]> {
    return this.http.get<TrabajoTipo[]>('trabajos/tipos');
  }
  
  obtenerEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('trabajos/estados');
  }
}
