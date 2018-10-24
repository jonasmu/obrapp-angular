import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Trabajo } from '../modelos/trabajo.model';
import { Contrato } from '../modelos/contrato.model';
import { Estado } from '../modelos/estado.model';

@Injectable()
export class TrabajosService {

  constructor(
    private http: HttpClient) { }

  obtenerPorUsuario(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>('trabajos');
  }

  obtenerPorId(id: number): Observable<Trabajo> {
    return this.http.get<Trabajo>('trabajos/' + id);
  }

  crear(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.post<Trabajo>('trabajos', trabajo);
  }

  actualizar(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.put<Trabajo>('trabajos', trabajo);
  }

  eliminar(id: number): Observable<Trabajo> {
    return this.http.delete<Trabajo>('trabajos/' + id);
  }

  anular(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.put<Trabajo>('trabajos', trabajo);
  }

  obtenerContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>('trabajos/contratos');
  }

  obtenerEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('trabajos/estados');
  }
}
