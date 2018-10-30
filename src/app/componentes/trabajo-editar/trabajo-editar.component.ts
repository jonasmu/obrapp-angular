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
import { FormBuilder, Validators } from '@angular/forms';

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

  formulario = this.fb.group({
    nombre: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    descripcion: this.fb.control(''),
    idEstado: this.fb.control('', [Validators.required]),
    idContratista: this.fb.control('', [Validators.required]),
    ayudantes: this.fb.control('', [Validators.required]),
    idContrato: this.fb.control('', [Validators.required]),
    precio: this.fb.control(''),
  });

  get nombre() { return this.formulario.get('nombre'); }
  get descripcion() { return this.formulario.get('descripcion'); }
  get idEstado() { return this.formulario.get('idEstado'); }
  get idContratista() { return this.formulario.get('idContratista'); }
  get ayudantes() { return this.formulario.get('ayudantes'); }
  get idContrato() { return this.formulario.get('idContrato'); }
  get precio() { return this.formulario.get('precio'); }

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private trabajosService: TrabajosService,
    private serviceService: SesionService,
    private contratistasService: ContratistasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inicializarTrabajo();
  }

  inicializarTrabajo(): void {
    let url = this.globalService.mapearUrl(Url.trabajo_nuevo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.resetearTrabajo();
      this.cargarContratistas();
      this.cargarEstados();
      this.cargarContratos();
    }
    else {
      this.esCrear = false;
      let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
      this.trabajosService.obtenerPorId(idTrabajo).subscribe(
        res => {
          this.trabajo = res;
          this.cargarFormulario();
          this.cargarContratistas();
          this.cargarEstados();
          this.cargarContratos();
        },
        error => this.globalService.manejarError(error)
      );
    }
  }

  cargarContratistas(): void {
    this.contratistasService.obtenerTodos().subscribe(
      res => {
        this.contratistas = res;
        if (!this.esCrear) {
          let contratistaEliminado = true;
          for (let i = 0; i < this.contratistas.length; i++) {
            if (this.contratistas[i].Id == this.trabajo.Contratista.Id) {
              contratistaEliminado = false;
              break;
            }
          }
          if (contratistaEliminado) {
            this.contratistas.push(this.trabajo.Contratista);
          }
        }
        if (this.contratistas.length == 0) {
          let mensaje = 'Sin contratistas cargados en el sistema no es posible crear un trabajo nuevo\n¿Desea cargar un contratista ahora?';
          if (this.globalService.confirmarAccion(mensaje)) {
            this.globalService.navegar(Url.contratista_nuevo);
          }
          else {
            this.globalService.volver();
          }
        }
      },
      error => this.globalService.manejarError(error)
    );
  }

  cargarEstados(): void {
    this.trabajosService.obtenerEstados().subscribe(
      res => this.estados = res,
      error => this.globalService.manejarError(error)
    );
  }

  cargarContratos(): void {
    this.trabajosService.obtenerContratos().subscribe(
      res => this.contratos = res,
      error => this.globalService.manejarError(error)
    );
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (!this.formulario.valid 
      || this.idContratista.value == 0 
      || this.idContrato.value == 0 
      || this.idEstado.value == 0) {
      this.globalService.notificar('El formulario no es válido');
      return;
    }
    this.volcarFormulario();
    if (this.esCrear) {
      this.trabajosService.crear(this.trabajo).subscribe(
        res => {
          if (this.globalService.confirmarAccion('¿Querés cargar otro trabajo más?')) {
            this.resetearTrabajo();
          }
          else {
            this.globalService.navegar(Url.trabajos);
          }
        },
        error => this.globalService.manejarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar trabajo?')) {
      this.trabajosService.actualizar(this.trabajo).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.trabajo.Id),
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

  resetearTrabajo(): void {
    this.trabajo = new Trabajo();
    this.trabajo.Id = 0;
    this.trabajo.IdUsuario = this.serviceService.obtenerUsuario().Id;
    this.trabajo.Contrato = new Contrato();
    this.trabajo.Contrato.Id = 0;
    this.trabajo.Contrato.Nombre = '';
    this.trabajo.Estado = new Estado();
    this.trabajo.Estado.Id = 0;
    this.trabajo.Estado.Nombre = '';
    this.trabajo.Contratista = new Contratista();
    this.trabajo.Contratista.Id = 0;
    this.trabajo.Contratista.Nombre = '';
    this.trabajo.Contratista.Apellido = '';
    this.trabajo.Contratista.Telefono = '';
    this.trabajo.Contratista.Domicilio = '';
    this.trabajo.Contratista.Observaciones = '';
    this.trabajo.Contratista.EstaEliminado = false;
    this.trabajo.Ayudantes = 0;
    this.trabajo.Nombre = '';
    this.trabajo.Descripcion = '';
    this.trabajo.Precio = 0;
    this.trabajo.EstaEliminado = false;

    this.nombre.setValue('');
    this.descripcion.setValue('');
    this.idEstado.setValue(0);
    this.idContratista.setValue(0);
    this.ayudantes.setValue(0);
    this.idContrato.setValue(0);
    this.precio.setValue(0);
  }

  cargarFormulario(): void {
    this.nombre.setValue(this.trabajo.Nombre);
    this.descripcion.setValue(this.trabajo.Descripcion);
    this.idEstado.setValue(this.trabajo.Estado.Id);
    this.idContratista.setValue(this.trabajo.Contratista.Id);
    this.ayudantes.setValue(this.trabajo.Ayudantes);
    this.idContrato.setValue(this.trabajo.Contrato.Id);
    this.precio.setValue(this.trabajo.Precio);
  }

  volcarFormulario(): void {
    this.trabajo.Nombre = this.nombre.value;
    this.trabajo.Descripcion = this.descripcion.value;
    this.trabajo.Ayudantes = this.ayudantes.value;
    this.trabajo.Precio = this.precio.value;

    this.trabajo.Contratista = this.contratistas.filter(x => x.Id === this.idContratista.value)[0];
    this.trabajo.Contrato = this.contratos.filter(x => x.Id === this.idContrato.value)[0];
    this.trabajo.Estado = this.estados.filter(x => x.Id === this.idEstado.value)[0];
  }
}
