import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Tarea } from 'src/app/modelos/tarea.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TareasService } from 'src/app/servicios/tareas.service';

@Component({
  selector: 'app-tarea-editar',
  templateUrl: './tarea-editar.component.html',
  styleUrls: ['./tarea-editar.component.css']
})
export class TareaEditarComponent implements OnInit {

  tarea: Tarea;
  esCrear: boolean;

  constructor(
    private tareasService: TareasService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.inicializarTarea();
  }


  obtenerIdTrabajo(): number {
    let idTrabajo: number = 0;
    this.route.params.subscribe(
      params => idTrabajo = params['idTrabajo'],
      error => idTrabajo = 0
    );
    return idTrabajo;
  }

  obtenerIdTarea(): number {
    let idTarea: number = 0;
    this.route.params.subscribe(
      params => idTarea = params['idTarea'],
      error => idTarea = 0
    );
    return idTarea;
  }

  inicializarTarea(): void {

    let idTrabajo = this.obtenerIdTrabajo();
    if (isNaN(idTrabajo) || idTrabajo == 0) {
      this.errorVolver();
    }

    if (this.router.url.includes(idTrabajo + '/tarea/nueva')) {
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
      let idTarea = this.obtenerIdTarea();
      if (isNaN(idTarea) || idTarea == 0) {
        this.errorVolver();
      }
      else {
        this.tareasService.obtenerPorId(idTarea).subscribe(
          res => this.tarea = res,
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
      this.tareasService.crear(this.tarea).subscribe(
        res => {
          this.router.navigateByUrl('trabajo/' + this.tarea.IdTrabajo);
        },
        error => {
          this.errorVolver(error);
        }
      );
    }
    else if (confirm('¿Actualizar tarea?')) {
      this.tareasService.actualizar(this.tarea).subscribe(
        res => {
          this.router.navigateByUrl('trabajo/' + this.tarea.IdTrabajo);
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
    this.router.navigateByUrl('trabajos');
  }
}
