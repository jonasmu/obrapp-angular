import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Pago } from 'src/app/modelos/pago.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosService } from 'src/app/servicios/pagos.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';

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
    private globalService: GlobalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inicializarPago();
  }


  // obtenerIdTrabajo(): number {
  //   let idTrabajo: number = 0;
  //   this.route.params.subscribe(
  //     params => idTrabajo = params['idTrabajo'],
  //     error => idTrabajo = 0
  //   );
  //   return idTrabajo;
  // }

  // obtenerIdPago(): number {
  //   let idTarea: number = 0;
  //   this.route.params.subscribe(
  //     params => idTarea = params['idPago'],
  //     error => idTarea = 0
  //   );
  //   return idTarea;
  // }

  inicializarPago(): void {

    let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    if (this.globalService.urlIncluye(`${idTrabajo}/pago/nuevo`)) {
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
      let idPago = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdPago);
      this.pagosService.obtenerPorId(idPago).subscribe(
        res => this.pago = res,
        error => this.globalService.notificarError(error)
      );
    }
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (this.esCrear) {
      this.pagosService.crear(this.pago).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.pago.IdTrabajo),
        error => this.globalService.notificarError(error)
      );
    }
    else if (confirm('¿Actualizar pago?')) {
      this.pagosService.actualizar(this.pago).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.pago.IdTrabajo),
        error => this.globalService.notificarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }
}
