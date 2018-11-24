import { Component, OnInit } from '@angular/core';
import { Pago } from '@modelos/pago.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosService } from '@servicios/pagos.service';
import { GlobalService } from '@servicios/global.service';
import { Parametro } from '@modelos/parametro.model';
import { Url } from '@modelos/url.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago-editar',
  templateUrl: './pago-editar.component.html',
  styleUrls: ['./pago-editar.component.css']
})
export class PagoEditarComponent implements OnInit {

  idTrabajo: number;
  pago: Pago;
  esCrear: boolean;

  formulario = this.fb.group({
    fecha: this.fb.control(''),
    observaciones: this.fb.control(''),
    monto: this.fb.control('', [Validators.required])
  });

  get fecha() { return this.formulario.get('fecha'); }
  get observaciones() { return this.formulario.get('observaciones'); }
  get monto() { return this.formulario.get('monto'); }

  constructor(
    private fb: FormBuilder,
    private pagosService: PagosService,
    private globalService: GlobalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    this.inicializarPago();
  }

  inicializarPago(): void {
    let url = this.globalService.mapearUrl(Url.pago_nuevo, this.idTrabajo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.resetearPago();
    }
    else {
      this.esCrear = false;
      let idPago = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdPago);
      this.pagosService.obtenerPorId(idPago).subscribe(
        res => {
          this.pago = res;
          this.cargarFormulario();
        },
        error => this.globalService.manejarError(error)
      );
    }
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (!this.formulario.valid) {
      this.globalService.notificar('El formulario no es válido');
      return;
    }
    this.volcarFormulario();
    if (this.esCrear) {
      this.pagosService.crear(this.pago).subscribe(
        res => {
          if (this.globalService.confirmarAccion('¿Querés cargar otro pago más?')) {
            this.resetearPago();
          }
          else {
            this.globalService.navegar(Url.trabajo_detalle, this.pago.IdTrabajo);
          }
        },
        error => this.globalService.manejarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar pago?')) {
      this.pagosService.actualizar(this.pago).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.pago.IdTrabajo),
        error => this.globalService.manejarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }

  seleccionarContenido($event) {
    $event.target.select();
  }

  resetearPago(): void {
    this.pago = new Pago();
    this.pago.Id = 0;
    this.pago.IdTrabajo = this.idTrabajo;
    this.pago.Fecha = new Date(Date.now());
    this.pago.Observaciones = '';
    this.pago.Monto = 0;
    this.pago.EstaEliminado = false;

    this.fecha.setValue(new Date(Date.now()));
    this.observaciones.setValue('');
    this.monto.setValue(0);
  }

  cargarFormulario(): void {
    this.fecha.setValue(this.pago.Fecha);
    this.observaciones.setValue(this.pago.Observaciones);
    this.monto.setValue(this.pago.Monto);
  }

  volcarFormulario(): void {
    this.pago.Fecha = this.fecha.value;
    this.pago.Observaciones = this.observaciones.value;
    this.pago.Monto = this.monto.value;
  }
}
