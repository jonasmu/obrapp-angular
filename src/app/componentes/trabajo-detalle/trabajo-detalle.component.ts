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
    this.columnasDeTablaPagos = ['editar', 'anular', 'fecha', 'observaciones', 'monto'];
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
    this.pagosService.obtenerPorTrabajo(this.trabajo.Id).subscribe(
      res => this.pagos = res,
      error => console.error(error)
    );
  }

  editarTrabajo(): void {
    this.router.navigateByUrl(`trabajo/editar/${this.trabajo.Id}`);
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

  anularPago(id: number): void {

  }

  obtenerMontoTotal(): number {
    if (this.pagos == null){
      return 0;
    }
    var total = 0;
    for (var i = 0; i < this.pagos.length; i++) {
      if (isNaN(this.pagos[i].Monto)) {
        continue;
      }
      total += this.pagos[i].Monto;
    }
    return total;
  }
}
