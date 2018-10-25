import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pago } from 'src/app/modelos/pago.model';
import { PagosService } from 'src/app/servicios/pagos.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';

@Component({
  selector: 'app-trabajo-detalle',
  templateUrl: './trabajo-detalle.component.html',
  styleUrls: ['./trabajo-detalle.component.css']
})
export class TrabajoDetalleComponent implements OnInit {

  trabajo: Trabajo;
  pagos: Pago[];
  columnasDeTablaTareas: string[];
  columnasDeTablaPagos: string[];

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private pagosService: PagosService,
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
      'observaciones'
    ];
    this.columnasDeTablaPagos = [
      'editar',
      'fecha',
      'observaciones',
      'anulado',
      'monto'
    ];
  }

  cargarTrabajo(): void {
    let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    this.trabajosService.obtenerPorId(idTrabajo).subscribe(
      res => {
        this.trabajo = res;
        this.cargarPagos();
      },
      error => this.globalService.notificarError(error)
    );
  }

  cargarPagos(): void {
    this.pagos = [];
    this.pagosService.obtenerPorTrabajo(this.trabajo.Id).subscribe(
      res => this.pagos = res,
      error => this.globalService.notificarError(error)
    );
  }

  editarTrabajo(): void {
    this.globalService.navegar(Url.trabajo_editar, this.trabajo.Id);
  }

  eliminarTrabajo(): void {
    if (confirm(`¿Seguro que querés eliminar el trabajo:\n${this.trabajo.Nombre}?`)) {
      this.trabajosService.eliminar(this.trabajo.Id).subscribe(
        res => this.globalService.navegar(Url.trabajos),
        error => this.globalService.notificarError(error)
      );
    }
  }

  crearTarea(evento: Event): void {
    this.globalService.navegar(Url.tarea_nueva, this.trabajo.Id);
  }

  editarTarea(id: number): void {
    this.globalService.navegar(Url.tarea_editar, this.trabajo.Id, id);
  }

  eliminarTarea(id: number): void {

  }

  crearPago(evento: Event): void {
    this.globalService.navegar(Url.pago_nuevo, this.trabajo.Id);
  }

  editarPago(id: number): void {
    this.globalService.navegar(Url.pago_editar, this.trabajo.Id, id);
  }

  anularPago(pago: Pago): void {
    let mensaje = `¿Seguro que querés ${pago.EstaAnulado ? 'ratificar' : 'anular'} 
                  el pago registrado el ${pago.Fecha} por $${pago.Monto}?`;
    if (this.globalService.confirmarAccion(mensaje)) {
      pago.EstaAnulado = !pago.EstaAnulado;
      this.pagosService.actualizar(pago).subscribe(
        null,
        error => this.globalService.notificarError(error)
      );
    }
  }

  obtenerMontoDePagosRatificados(): number {
    let pagos = this.pagos.filter(x => !x.EstaAnulado);
    return this.sumarPagos(pagos);
  }

  obtenerMontoDePagosAnulados(): number {
    let pagos = this.pagos.filter(x => x.EstaAnulado);
    return this.sumarPagos(pagos);
  }

  obtenerMontoDePagosTotal(): number {
    return this.sumarPagos(this.pagos);
  }

  private sumarPagos(pagos: Pago[]): number {
    if (this.pagos == null) {
      return 0;
    }
    var total = 0;
    for (var i = 0; i < pagos.length; i++) {
      if (isNaN(pagos[i].Monto)) {
        continue;
      }
      total += pagos[i].Monto;
    }
    return total;
  }
}
