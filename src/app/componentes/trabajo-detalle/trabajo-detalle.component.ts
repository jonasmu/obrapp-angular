import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pago } from 'src/app/modelos/pago.model';
import { PagosService } from 'src/app/servicios/pagos.service';

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
    private router: Router,
    private location: Location,
    private pagosService: PagosService,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.cargarTrabajo();
    this.establecerColumnasDeTablas();
  }

  establecerColumnasDeTablas(): void {
    this.columnasDeTablaTareas = ['editar', 'eliminar', 'nombre', 'observaciones'];
    this.columnasDeTablaPagos = ['editar', 'fecha', 'observaciones', 'anulado', 'monto'];
  }

  cargarTrabajo(): void {
    let idTrabajo: number;
    this.route.params.subscribe(params => {
      idTrabajo = params['idTrabajo']
    });
    this.trabajosService.obtenerPorId(idTrabajo).subscribe(
      res => {
        this.trabajo = res;
        this.cargarPagos();
      },
      error => {
        console.error(error);
        this.location.back();
      }
    );
  }

  cargarPagos(): void {
    this.pagos = [];
    this.pagosService.obtenerPorTrabajo(this.trabajo.Id).subscribe(
      res => this.pagos = res,
      error => console.error(error)
    );
  }

  editarTrabajo(): void {
    this.router.navigateByUrl(`trabajo/editar/${this.trabajo.Id}`);
  }

  eliminarTrabajo(): void {
    if (confirm(`¿Seguro que querés eliminar el trabajo:\n${this.trabajo.Nombre}?`)) {
      this.trabajosService.eliminar(this.trabajo.Id).subscribe(
        res => this.router.navigateByUrl('trabajos'),
        error => console.error(error)
      );
    }
  }

  crearTarea(evento: Event): void {
    this.router.navigateByUrl(`trabajo/${this.trabajo.Id}/tarea/nueva`);
  }

  editarTarea(id: number): void {
    this.router.navigateByUrl(`trabajo/${this.trabajo.Id}/tarea/editar/${id}`);
  }

  eliminarTarea(id: number): void {

  }

  crearPago(evento: Event): void {
    this.router.navigateByUrl(`trabajo/${this.trabajo.Id}/pago/nuevo`);
  }

  editarPago(id: number): void {
    this.router.navigateByUrl(`trabajo/${this.trabajo.Id}/pago/editar/${id}`);
  }

  anularPago(pago: Pago): void {
    if (confirm(`¿Seguro que querés ${pago.EstaAnulado ? 'ratificar' : 'anular'} el pago registrado el ${pago.Fecha} por $${pago.Monto}?`)) {
      pago.EstaAnulado = !pago.EstaAnulado;
      this.pagosService.actualizar(pago).subscribe(
        res => { },
        error => console.error(error)
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
