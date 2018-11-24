import { Component, OnInit } from '@angular/core';
import { Contratista } from '@modelos/contratista.model'
import { ContratistasService } from '@servicios/contratistas.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '@servicios/global.service';
import { Url } from '@modelos/url.model';
import { Parametro } from '@modelos/parametro.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SesionService } from '@servicios/sesion.service';
import { Usuario } from '@modelos/usuario.model';

@Component({
  selector: 'app-contratista-editar',
  templateUrl: './contratista-editar.component.html',
  styleUrls: ['./contratista-editar.component.css']
})
export class ContratistaEditarComponent implements OnInit {

  usuario: Usuario;
  contratista: Contratista;
  esCrear: boolean;

  formulario = this.fb.group({
    nombre: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    apellido: this.fb.control('', [Validators.maxLength(50)]),
    telefono: this.fb.control('', [Validators.maxLength(50)]),
    domicilio: this.fb.control('', [Validators.maxLength(50)]),
    observaciones: this.fb.control('')
  });

  get nombre() { return this.formulario.get('nombre'); }
  get apellido() { return this.formulario.get('apellido'); }
  get telefono() { return this.formulario.get('telefono'); }
  get domicilio() { return this.formulario.get('domicilio'); }
  get observaciones() { return this.formulario.get('observaciones'); }

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionService,
    private globalService: GlobalService,
    private contratistasService: ContratistasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.usuario = this.sesionService.obtenerUsuario();
    this.inicializarContratista();
  }

  inicializarContratista(): void {
    let url = this.globalService.mapearUrl(Url.contratista_nuevo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.resetearContratista();
    }
    else {
      this.esCrear = false;
      let idContratista = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdContratista);
      this.contratistasService.obtenerPorId(idContratista).subscribe(
        res => {
          this.contratista = res;
          this.verificarUsuario();
          this.cargarFormulario();
        },
        error => this.globalService.manejarError(error)
      );
    }
  }

  verificarUsuario(): void {
    if (this.contratista.IdUsuario != this.usuario.Id) {
      this.globalService.notificar('Solo el usuario que dió de alta al contratista puede editarlo');
      this.globalService.volver();
    }
  }

  resetearContratista(): void {
    this.contratista = new Contratista();
    this.contratista.Id = 0;
    this.contratista.IdUsuario = this.usuario.Id;
    this.contratista.Nombre = '';
    this.contratista.Apellido = '';
    this.contratista.Telefono = '';
    this.contratista.Domicilio = '';
    this.contratista.Observaciones = '';
    this.contratista.EstaEliminado = false;

    this.nombre.setValue('');
    this.apellido.setValue('');
    this.telefono.setValue('');
    this.domicilio.setValue('');
    this.observaciones.setValue('');
  }

  volcarFormulario(): void {
    this.contratista.Nombre = this.nombre.value;
    this.contratista.Apellido = this.apellido.value;
    this.contratista.Telefono = this.telefono.value;
    this.contratista.Domicilio = this.domicilio.value;
    this.contratista.Observaciones = this.observaciones.value;
  }

  cargarFormulario(): void {
    this.nombre.setValue(this.contratista.Nombre);
    this.apellido.setValue(this.contratista.Apellido);
    this.telefono.setValue(this.contratista.Telefono);
    this.domicilio.setValue(this.contratista.Domicilio);
    this.observaciones.setValue(this.contratista.Observaciones);
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (!this.formulario.valid) {
      this.globalService.notificar('El formulario no es válido');
      return;
    }
    this.volcarFormulario();
    if (this.esCrear) {
      this.contratistasService.crear(this.contratista).subscribe(
        res => {
          if (this.globalService.confirmarAccion('¿Querés cargar otro contratista más?')) {
            this.resetearContratista();
          }
          else {
            this.globalService.navegar(Url.contratistas);
          }
        },
        error => this.globalService.manejarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar contratista?')) {
      this.contratistasService.actualizar(this.contratista).subscribe(
        res => this.globalService.navegar(Url.contratista_detalle, this.contratista.Id),
        error => this.globalService.manejarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }
}
