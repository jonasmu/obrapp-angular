import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../modelos/pago.model';
import { Observable } from 'rxjs';

@Injectable()
export class PagosService {

  constructor(
    private http: HttpClient) { }

  obtenerPorUsuario(): Observable<Pago[]> {
    return this.http.get<Pago[]>('pagos');
  }

  obtenerPorTrabajo(id : number): Observable<Pago[]> {
    return this.http.get<Pago[]>('pagos/trabajo/' + id);
  }

  obtenerPorContratista(id : number): Observable<Pago[]> {
    return this.http.get<Pago[]>('pagos/contratista/' + id);
  }

  obtenerPorId(id: number): Observable<Pago> {
    return this.http.get<Pago>('pagos/' + id);
  }

  crear(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>('pagos', pago);
  }

  actualizar(pago: Pago): Observable<Pago> {
    return this.http.put<Pago>('pagos', pago);
  }
}
