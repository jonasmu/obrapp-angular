import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { Contratista } from 'src/app/modelos/contratista.model';
import { Estado } from 'src/app/modelos/estado.model';
import { TrabajoTipo } from 'src/app/modelos/trabajo-tipo.model';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-trabajo-detalle',
  templateUrl: './trabajo-detalle.component.html',
  styleUrls: ['./trabajo-detalle.component.css']
})
export class TrabajoDetalleComponent implements OnInit {

  trabajo: Trabajo;
  contratistas: Contratista[];
  estados: Estado[];
  tipos: TrabajoTipo[];

  constructor(
    private trabajosService: TrabajosService,
    private serviceService: SesionService,
    private contratistasService: ContratistasService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.inicializarTrabajo();
    this.cargarContratistas();
    this.cargarEstados();
    this.cargarTipos();
  }

  inicializarTrabajo(): void {
    this.trabajo = {
      Id: 0,
      IdTipo: 0,
      IdEstado: 0,
      IdContratista: 0,
      IdUsuario: this.serviceService.obtener().Id,
      Nombre: '',
      Descripcion: '',
      Precio: 0
    };
  }

  cargarContratistas(): void {
    this.contratistasService.obtenerTodos().subscribe(
      res => this.contratistas = res,
      error => console.error(error)
    );
  }

  cargarEstados(): void{
    this.trabajosService.obtenerEstados().subscribe(
      res => this.estados = res,
      error => console.error(error)
    );
  }

  cargarTipos(): void{
    this.trabajosService.obtenerTipos().subscribe(
      res => this.tipos = res,
      error => console.error(error)
    );
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    this.trabajosService.crear(this.trabajo).subscribe(
      res => {
        this.router.navigateByUrl('trabajos');
      },
      error => {
        console.error(error);
      }
    );
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.location.back();
  }
}
