import { Component, OnInit } from '@angular/core';
import { Tarea } from '@modelos/tarea.model';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '@servicios/tareas.service';
import { GlobalService } from '@servicios/global.service';
import { Parametro } from '@modelos/parametro.model';
import { Url } from '@modelos/url.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarea-editar',
  templateUrl: './tarea-editar.component.html',
  styleUrls: ['./tarea-editar.component.css']
})
export class TareaEditarComponent implements OnInit {

  idTrabajo: number;
  tarea: Tarea;
  esCrear: boolean;

  formulario = this.fb.group({
    nombre: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    observaciones: this.fb.control(''),
    estaRealizada: this.fb.control('')
  });

  get nombre() { return this.formulario.get('nombre'); }
  get observaciones() { return this.formulario.get('observaciones'); }
  get estaRealizada() { return this.formulario.get('estaRealizada'); }

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private tareasService: TareasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    this.inicializarTarea();
  }

  inicializarTarea(): void {
    let url = this.globalService.mapearUrl(Url.tarea_nueva, this.idTrabajo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.resetearTarea();
    }
    else {
      this.esCrear = false;
      let idTarea = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTarea);
      this.tareasService.obtenerPorId(idTarea).subscribe(
        res => {
          this.tarea = res;
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
      this.tareasService.crear(this.tarea).subscribe(
        res => {
          if (this.globalService.confirmarAccion('¿Querés cargar otra tarea más?')) {
            this.resetearTarea();
          }
          else {
            this.globalService.navegar(Url.trabajo_detalle, this.tarea.IdTrabajo);
          }
        },
        error => this.globalService.manejarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar tarea?')) {
      this.tareasService.actualizar(this.tarea).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.tarea.IdTrabajo),
        error => this.globalService.manejarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }

  resetearTarea(): void {
    this.tarea = new Tarea();
    this.tarea.Id = 0;
    this.tarea.IdTrabajo = this.idTrabajo;
    this.tarea.Nombre = '';
    this.tarea.Observaciones = '';
    this.tarea.EstaRealizada = false;
    this.tarea.EstaEliminada = false;

    this.nombre.setValue('');
    this.observaciones.setValue('');
    this.estaRealizada.setValue(false);
  }

  cargarFormulario(): void {
    this.nombre.setValue(this.tarea.Nombre);
    this.observaciones.setValue(this.tarea.Observaciones);
    this.estaRealizada.setValue(this.tarea.EstaRealizada);
  }

  volcarFormulario(): void {
    this.tarea.Nombre = this.nombre.value;
    this.tarea.Observaciones = this.observaciones.value;
    this.tarea.EstaRealizada = this.estaRealizada.value;
  }
}
