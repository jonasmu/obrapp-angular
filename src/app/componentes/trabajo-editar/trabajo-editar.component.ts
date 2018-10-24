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
    private trabajosService: TrabajosService,
    private serviceService: SesionService,
    private contratistasService: ContratistasService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.inicializarTrabajo();
    this.cargarContratistas();
    this.cargarEstados();
    this.cargarContratos();
  }

  obtenerIdTrabajo(): number {
    let idTrabajo: number = 0;
    this.route.params.subscribe(
      params => idTrabajo = params['idTrabajo'],
      error => idTrabajo = 0
    );
    return idTrabajo;
  }

  inicializarTrabajo(): void {

    let idTrabajo = this.obtenerIdTrabajo();
    if (isNaN(idTrabajo) || idTrabajo == 0) {
      this.errorVolver();
    }

    if (this.router.url.includes(idTrabajo + '/tarea/nueva')) {
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
          Observaciones: ''
        },
        Nombre: '',
        Descripcion: '',
        Precio: 0,
        Tareas: []
      };
    }
    else {
      this.esCrear = false;
      this.trabajosService.obtenerPorId(idTrabajo).subscribe(
        res => this.trabajo = res,
        error => {
          console.error(error);
          this.errorVolver();
        }
      );
    }
  }

  cargarContratistas(): void {
    this.contratistasService.obtenerTodos().subscribe(
      res => this.contratistas = res,
      error => console.error(error)
    );
  }

  cargarEstados(): void {
    this.trabajosService.obtenerEstados().subscribe(
      res => this.estados = res,
      error => console.error(error)
    );
  }

  cargarContratos(): void {
    this.trabajosService.obtenerContratos().subscribe(
      res => this.contratos = res,
      error => console.error(error)
    );
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (this.esCrear) {
      this.trabajosService.crear(this.trabajo).subscribe(
        res => this.router.navigateByUrl('trabajos'),
        error => this.errorVolver(error)
      );
    }
    else if (confirm('¿Actualizar tarea?')) {
      this.trabajo.Contratista = this.contratistas.filter(x => x.Id === this.trabajo.Contratista.Id)[0];
      this.trabajo.Contrato = this.contratos.filter(x => x.Id === this.trabajo.Contrato.Id)[0];
      this.trabajo.Estado = this.estados.filter(x => x.Id === this.trabajo.Estado.Id)[0];
      this.trabajosService.actualizar(this.trabajo).subscribe(
        res => this.router.navigateByUrl('trabajo/' + this.trabajo.Id),
        error => this.errorVolver(error)
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
