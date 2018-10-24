import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../modelos/tarea.model';
import { Observable } from 'rxjs';

@Injectable()
export class TareasService {

  constructor(
    private http: HttpClient) { }

  crear(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>('tareas', tarea);
  }

  actualizar(tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>('tareas', tarea);
  }

  obtenerPorId(idTarea: number): Observable<Tarea> {
    return this.http.get<Tarea>('tareas/' + idTarea);
  }
}
