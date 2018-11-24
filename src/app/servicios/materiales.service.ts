import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Material } from '@modelos/material-model';
import { Observable } from 'rxjs';

@Injectable()
export class MaterialesService {

  constructor(
    private http: HttpClient) { }

  crear(material: Material): Observable<Material> {
    return this.http.post<Material>('materiales', material);
  }

  actualizar(material: Material): Observable<Material> {
    return this.http.put<Material>('materiales', material);
  }

  eliminar(id: number): Observable<Material> {
    return this.http.delete<Material>('materiales/' + id);
  }

  obtenerPorId(id: number): Observable<Material> {
    return this.http.get<Material>('materiales/' + id);
  }

  obtenerPorUsuario(): Observable<Material[]> {
    return this.http.get<Material[]>('materiales');
  }

  obtenerPorTrabajo(id : number): Observable<Material[]> {
    return this.http.get<Material[]>('materiales/trabajo/' + id);
  }
}
