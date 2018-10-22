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

  crear(contratista: Contratista): Observable<Contratista> {
    return this.http.post<Contratista>('contratistas', contratista);
  }
}
