import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { Contratista } from 'src/app/modelos/contratista.model';
import { Estado } from 'src/app/modelos/estado.model';
import { Contrato } from 'src/app/modelos/contrato.model';
import { SesionService } from 'src/app/servicios/sesion.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';

@Component({
  selector: 'app-trabajo-editar',
  templateUrl: './trabajo-editar.component.html',
  styleUrls: ['./trabajo-editar.component.css']
})
export class TrabajoEditarComponent implements OnInit {

  trabajo: Trabajo;
  contratistas: Contratista[];
  estados: Estado[];
  contratos: Contrato[];
  esCrear: boolean;

  constructor(
    private globalService: GlobalService,
    private trabajosService: TrabajosService,
    private serviceService: SesionService,
    private contratistasService: ContratistasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inicializarTrabajo();
    this.cargarContratistas();
    this.cargarEstados();
    this.cargarContratos();
  }

  inicializarTrabajo(): void {

    if (this.globalService.urlIncluye('/trabajo/nuevo')) {
      this.esCrear = true;
      this.trabajo = {
        Id: 0,
        IdUsuario: this.serviceService.obtener().Id,
        Contrato: {
          Id: 0,
          Nombre: ''
        },
        Estado: {
          Id: 0,
          Nombre: ''
        },
        Contratista: {
          Id: 0,
          Nombre: '',
          Apellido: '',
          Telefono: '',
          Domicilio: '',
          Observaciones: '',
          EstaEliminado: false
        },
        Nombre: '',
        Descripcion: '',
        Precio: 0,
        Tareas: [],
        EstaEliminado: false
      };
    }
    else {
      let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
      this.esCrear = false;
      this.trabajosService.obtenerPorId(idTrabajo).subscribe(
        res => this.trabajo = res,
        error => this.globalService.notificarError(error)
      );
    }
  }

  cargarContratistas(): void {
    this.contratistasService.obtenerTodos().subscribe(
      res => this.contratistas = res,
      error => this.globalService.notificarError(error)
    );
  }

  cargarEstados(): void {
    this.trabajosService.obtenerEstados().subscribe(
      res => this.estados = res,
      error => this.globalService.notificarError(error)
    );
  }

  cargarContratos(): void {
    this.trabajosService.obtenerContratos().subscribe(
      res => this.contratos = res,
      error => this.globalService.notificarError(error)
    );
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (this.esCrear) {
      this.trabajosService.crear(this.trabajo).subscribe(
        res => this.globalService.navegar(Url.trabajos),
        error => this.globalService.notificarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar trabajo?')) {
      this.trabajo.Contratista = this.contratistas.filter(x => x.Id === this.trabajo.Contratista.Id)[0];
      this.trabajo.Contrato = this.contratos.filter(x => x.Id === this.trabajo.Contrato.Id)[0];
      this.trabajo.Estado = this.estados.filter(x => x.Id === this.trabajo.Estado.Id)[0];
      this.trabajosService.actualizar(this.trabajo).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.trabajo.Id),
        error => this.globalService.notificarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }
}
