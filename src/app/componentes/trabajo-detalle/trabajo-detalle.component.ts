import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Pago } from 'src/app/modelos/pago.model';
import { PagosService } from 'src/app/servicios/pagos.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';
import { Material } from 'src/app/modelos/material-model';
import { MaterialesService } from 'src/app/servicios/materiales.service';
import { TareasService } from 'src/app/servicios/tareas.service';
import { Tarea } from 'src/app/modelos/tarea.model';

@Component({
  selector: 'app-trabajo-detalle',
  templateUrl: './trabajo-detalle.component.html',
  styleUrls: ['./trabajo-detalle.component.css']
})
export class TrabajoDetalleComponent implements OnInit {

  trabajo: Trabajo;
  tareas: Tarea[];
  pagos: Pago[];
  materiales: Material[];
  columnasDeTablaTareas: string[];
  columnasDeTablaPagos: string[];
  columnasDeTablaMateriales: string[];

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private pagosService: PagosService,
    private tareasService: TareasService,
    private materialesService: MaterialesService,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.cargarTrabajo();
    this.establecerColumnasDeTablas();
  }

  establecerColumnasDeTablas(): void {
    this.columnasDeTablaTareas = [
      'editar',
      'eliminar',
      'nombre',
      'observaciones',
      'estado'
    ];
    this.columnasDeTablaMateriales = [
      'editar',
      'eliminar',
      'nombre',
      'observaciones',
      'estado',
      'precio'
    ];
    this.columnasDeTablaPagos = [
      'editar',
      'eliminar',
      'fecha',
      'observaciones',
      'monto'
    ];
  }

  cargarTrabajo(): void {
    let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    this.trabajosService.obtenerPorId(idTrabajo).subscribe(
      res => {
        this.trabajo = res;
        this.cargarTareas();
        this.cargarPagos();
        this.cargarMateriales();
      },
      error => this.globalService.manejarError(error)
    );
  }

  cargarTareas(): void {
    this.tareasService.obtenerPorTrabajo(this.trabajo.Id).subscribe(
      res => this.tareas = res,
      error => this.globalService.manejarError(error)
    );
  }

  cargarPagos(): void {
    this.pagosService.obtenerPorTrabajo(this.trabajo.Id).subscribe(
      res => this.pagos = res,
      error => this.globalService.manejarError(error)
    );
  }

  cargarMateriales(): void {
    this.materialesService.obtenerPorTrabajo(this.trabajo.Id).subscribe(
      res => this.materiales = res,
      error => this.globalService.manejarError(error)
    );
  }

  crearTrabajo(evento: Event): void {
    evento.preventDefault();
    this.globalService.navegar(Url.trabajo_nuevo);
  }

  editarTrabajo(): void {
    this.globalService.navegar(Url.trabajo_editar, this.trabajo.Id);
  }

  eliminarTrabajo(): void {
    let mensaje = `¿Seguro que querés eliminar el trabajo:\n${this.trabajo.Nombre}?`;
    if (this.globalService.confirmarAccion(mensaje)) {
      this.trabajosService.eliminar(this.trabajo.Id).subscribe(
        res => this.globalService.navegar(Url.trabajos),
        error => this.globalService.manejarError(error)
      );
    }
  }

  crearTarea(evento: Event): void {
    this.globalService.navegar(Url.tarea_nueva, this.trabajo.Id);
  }

  editarTarea(id: number): void {
    this.globalService.navegar(Url.tarea_editar, this.trabajo.Id, id);
  }

  eliminarTarea(tarea: Tarea): void {
    let mensaje = `¿Seguro que querés eliminar la tarea:\n${tarea.Nombre}?`;
    if (this.globalService.confirmarAccion(mensaje)) {
      this.tareasService.eliminar(tarea.Id).subscribe(
        res => this.tareas = this.tareas.filter(x => x.Id != tarea.Id)
      );
    }
  }

  crearMaterial(evento: Event): void {
    this.globalService.navegar(Url.material_nuevo, this.trabajo.Id);
  }

  editarMaterial(id: number): void {
    this.globalService.navegar(Url.material_editar, this.trabajo.Id, id);
  }

  eliminarMaterial(material: Material): void {
    let mensaje = `¿Seguro que querés eliminar el material:\n${material.Nombre}?`;
    if (this.globalService.confirmarAccion(mensaje)) {
      this.materialesService.eliminar(material.Id).subscribe(
        res => this.materiales = this.materiales.filter(x => x.Id != material.Id)
      );
    }
  }

  crearPago(evento: Event): void {
    this.globalService.navegar(Url.pago_nuevo, this.trabajo.Id);
  }

  editarPago(id: number): void {
    this.globalService.navegar(Url.pago_editar, this.trabajo.Id, id);
  }

  eliminarPago(pago: Pago): void {
    let mensaje = `¿Seguro que querés eliminar el pago registrado el ${pago.Fecha} por $${pago.Monto}?`;
    if (this.globalService.confirmarAccion(mensaje)) {
      this.pagosService.eliminar(pago.Id).subscribe(
        res => this.pagos = this.pagos.filter(x => x.Id != pago.Id)
      );
    }
  }

  calcularTareasPendientes(): number {
    if (this.tareas == null) {
      return 0;
    }
    return this.tareas.filter(x => !x.EstaRealizada).length;
  }

  calcularTareasRealizadas(): number {
    if (this.tareas == null) {
      return 0;
    }
    return this.tareas.filter(x => x.EstaRealizada).length;
  }

  calcularMaterialesAdquiridos(): number {
    if (this.materiales == null) {
      return 0;
    }
    return this.materiales.filter(x => x.EstaAdquirido).length;
  }

  sumarPagosTotal(): number {
    if (!this.pagos) {
      return 0;
    }
    let montos = this.pagos.map(x => x.Monto);
    return this.globalService.sumar(montos);
  }

  sumarMaterialesFaltantes(): number {
    if (!this.materiales) {
      return 0;
    }
    let montos = this.materiales.filter(x => !x.EstaAdquirido).map(x => x.Precio);
    return this.globalService.sumar(montos);
  }

  sumarMaterialesComprados(): number {
    if (!this.materiales) {
      return 0;
    }
    let montos = this.materiales.filter(x => x.EstaAdquirido).map(x => x.Precio);
    return this.globalService.sumar(montos);
  }

  sumarMaterialesTotal(): number {
    if (!this.materiales) {
      return 0;
    }
    let montos = this.materiales.map(x => x.Precio);
    return this.globalService.sumar(montos);
  }


}
