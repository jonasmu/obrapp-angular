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

  inicializarPago(): void {
    let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    let url = this.globalService.mapearUrl(Url.pago_nuevo, idTrabajo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.pago = {
        Id: 0,
        IdTrabajo: idTrabajo,
        NombreTrabajo: '',
        Monto: 0,
        Fecha: new Date(Date.now()),
        Observaciones: '',
        EstaEliminado: false
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
    else if (this.globalService.confirmarAccion('¿Actualizar pago?')) {
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
