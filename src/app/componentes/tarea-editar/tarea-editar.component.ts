import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Tarea } from 'src/app/modelos/tarea.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TareasService } from 'src/app/servicios/tareas.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';

@Component({
  selector: 'app-tarea-editar',
  templateUrl: './tarea-editar.component.html',
  styleUrls: ['./tarea-editar.component.css']
})
export class TareaEditarComponent implements OnInit {

  tarea: Tarea;
  esCrear: boolean;

  constructor(
    private globalService: GlobalService,
    private tareasService: TareasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inicializarTarea();
  }


  // obtenerIdTrabajo(): number {
  //   let idTrabajo: number = 0;
  //   this.route.params.subscribe(
  //     params => idTrabajo = params['idTrabajo'],
  //     error => idTrabajo = 0
  //   );
  //   return idTrabajo;
  // }

  // obtenerIdTarea(): number {
  //   let idTarea: number = 0;
  //   this.route.params.subscribe(
  //     params => idTarea = params['idTarea'],
  //     error => idTarea = 0
  //   );
  //   return idTarea;
  // }

  inicializarTarea(): void {

    let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    if (this.globalService.urlIncluye(`${idTrabajo}/tarea/nueva`)) {
      this.esCrear = true;
      this.tarea = {
        Id: 0,
        IdTrabajo: idTrabajo,
        Nombre: '',
        Observaciones: ''
      };
    }
    else {
      this.esCrear = false;
      let idTarea = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTarea);
      this.tareasService.obtenerPorId(idTarea).subscribe(
        res => this.tarea = res,
        error => this.globalService.notificarError(error)
      );
    }
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (this.esCrear) {
      this.tareasService.crear(this.tarea).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.tarea.IdTrabajo),
        error => this.globalService.notificarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar tarea?')) {
      this.tareasService.actualizar(this.tarea).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.tarea.IdTrabajo),
        error => this.globalService.notificarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }
}
