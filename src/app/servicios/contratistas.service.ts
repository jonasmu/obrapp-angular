import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Contratista } from '../modelos/contratista.model';

@Injectable()
export class ContratistasService {

  constructor(
    private http: HttpClient) { }

  obtenerTodos(): Observable<Contratista[]> {
    return this.http.get<Contratista[]>('contratistas');
  }

  obtenerPorId(id: number): Observable<Contratista> {
    return this.http.get<Contratista>('contratistas/' + id);
  }

  crear(contratista: Contratista): Observable<Contratista> {
    return this.http.post<Contratista>('contratistas', contratista);
  }

  actualizar(contratista: Contratista): Observable<Contratista> {
    return this.http.put<Contratista>('contratistas', contratista);
  }

  eliminar(id: number): Observable<Contratista> {
    return this.http.delete<Contratista>('contratistas/' + id);
  }
}
