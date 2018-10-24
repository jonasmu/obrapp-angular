import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Pago } from 'src/app/modelos/pago.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosService } from 'src/app/servicios/pagos.service';

@Component({
  selector: 'app-pago-editar',
  templateUrl: './pago-editar.component.html',
  styleUrls: ['./pago-editar.component.css']
})
export class PagoEditarComponent implements OnInit {

  pago: Pago;
  esCrear: boolean;

  constructor(
    private pagosService: PagosService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.inicializarPago();
  }


  obtenerIdTrabajo(): number {
    let idTrabajo: number = 0;
    this.route.params.subscribe(
      params => idTrabajo = params['idTrabajo'],
      error => idTrabajo = 0
    );
    return idTrabajo;
  }

  obtenerIdPago(): number {
    let idTarea: number = 0;
    this.route.params.subscribe(
      params => idTarea = params['idPago'],
      error => idTarea = 0
    );
    return idTarea;
  }

  inicializarPago(): void {

    let idTrabajo = this.obtenerIdTrabajo();
    if (isNaN(idTrabajo) || idTrabajo == 0) {
      this.errorVolver();
    }

    if (this.router.url.includes(idTrabajo + '/pago/nuevo')) {
      this.esCrear = true;
      this.pago = {
        Id: 0,
        IdTrabajo: idTrabajo,
        Monto: 0,
        Fecha: new Date(Date.now()),
        Observaciones: '',
        EstaAnulado: false
      };
    }
    else {
      this.esCrear = false;
      let idPago = this.obtenerIdPago();
      if (isNaN(idPago) || idPago == 0) {
        this.errorVolver();
      }
      else {
        this.pagosService.obtenerPorId(idPago).subscribe(
          res => this.pago = res,
          error => {
            console.error(error);
            this.errorVolver();
          }
        );
      }
    }
  }
  aceptar(evento: Event) {
    evento.preventDefault();
    if (this.esCrear) {
      this.pagosService.crear(this.pago).subscribe(
        res => {
          this.router.navigateByUrl('trabajo/' + this.pago.IdTrabajo);
        },
        error => {
          this.errorVolver(error);
        }
      );
    }
    else if (confirm('¿Actualizar pago?')) {
      this.pagosService.actualizar(this.pago).subscribe(
        res => {
          this.router.navigateByUrl('trabajo/' + this.pago.IdTrabajo);
        },
        error => {
          this.errorVolver(error);
        }
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.location.back();
  }

  errorVolver(mensaje: string = ''): void {
    alert('Ha ocurrido un error\n' + mensaje);
    this.router.navigateByUrl('/');
  }
}
