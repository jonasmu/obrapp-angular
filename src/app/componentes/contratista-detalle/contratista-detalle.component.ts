import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Contratista } from 'src/app/modelos/contratista.model';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { GlobalService } from 'src/app/servicios/global.service';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';
import { PagosService } from 'src/app/servicios/pagos.service';
import { Pago } from 'src/app/modelos/pago.model';

@Component({
  selector: 'app-contratista-detalle',
  templateUrl: './contratista-detalle.component.html',
  styleUrls: ['./contratista-detalle.component.css']
})
export class ContratistaDetalleComponent implements OnInit {

  contratista: Contratista;
  trabajos: Trabajo[];
  pagos: Pago[];
  columnasDeTablaTrabajos: string[];
  columnasDeTablaPagos: string[];

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private contratistasService: ContratistasService,
    private pagosService: PagosService,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.cargarContratista();
    this.establecerColumnasDeTablas();
  }

  establecerColumnasDeTablas(): void {
    this.columnasDeTablaTrabajos = [
      'detalle',
      'nombre',
      'contrato',
      'estado',
      'precio'
      // 'pagado'
    ];
    this.columnasDeTablaPagos = [
      // 'editar',
      'fecha',
      'observaciones',
      // 'estado',
      'monto'
    ];
  }

  cargarContratista(): void {
    let idContratista = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdContratista);
    this.contratistasService.obtenerPorId(idContratista).subscribe(
      res => {
        this.contratista = res;
        this.cargarTrabajos();
        this.cargarPagos();
      },
      error => this.globalService.manejarError(error)
    );
  }

  cargarTrabajos(): void {
    this.trabajosService.obtenerPorContratista(this.contratista.Id).subscribe(
      res => this.trabajos = res,
      error => this.globalService.manejarError(error)
    );
  }

  cargarPagos(): void {
    this.pagosService.obtenerPorContratista(this.contratista.Id).subscribe(
      res => this.pagos = res,
      error => this.globalService.manejarError(error)
    );
  }

  crearContratista(evento: Event) {
    event.preventDefault();
    this.globalService.navegar(Url.contratista_nuevo);
  }

  editarContratista(): void {
    this.globalService.navegar(Url.contratista_editar, this.contratista.Id);
  }

  eliminarContratista(): void {
    let nombreApellido = this.contratista == null ? '' : `${this.contratista.Nombre} ${this.contratista.Apellido}`;
    let mensaje = `¿Seguro que querés eliminar al contratista:\n${nombreApellido}?`;
    if (this.globalService.confirmarAccion(mensaje)) {
      this.contratistasService.eliminar(this.contratista.Id).subscribe(
        res => this.globalService.navegar(Url.contratistas),
        error => this.globalService.manejarError(error)
      );
    }
  }

  verDetalle(id: number): void {
    this.globalService.navegar(Url.trabajo_detalle, id);
  }

  sumarPagos(): number {
    if (!this.pagos) {
      return 0;
    }
    let montos = this.pagos.map(x => x.Monto);
    return this.globalService.sumar(montos);
  }

  sumarPreciosDeTrabajos(): number {
    if (!this.trabajos) {
      return 0;
    }
    let precios = this.trabajos.map(x => x.Precio);
    return this.globalService.sumar(precios);
  }

}
