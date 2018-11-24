import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '@servicios/trabajos.service';
import { Trabajo } from '@modelos/trabajo.model';
import { Url } from '@modelos/url.model';
import { GlobalService } from '@servicios/global.service';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {
  trabajos: Trabajo[];
  columnasDeTabla: string[];

  constructor(
    private globalService: GlobalService,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.obtenerTrabajos();
    this.establecerColumnasDeTabla();
  }

  obtenerTrabajos() {
    this.trabajosService.obtenerPorUsuario().subscribe(
      res => this.trabajos = res.sort((a: Trabajo, b: Trabajo) => new Date(a.FechaInicio).getTime() - new Date(b.FechaInicio).getTime()),
      error => this.globalService.manejarError(error)
    );
  }

  establecerColumnasDeTabla(): void {
    this.columnasDeTabla = [
      'detalle',
      'nombre',
      'fechaInicio',
      'contratista',
      'contrato',
      'estado',
      'precio'
    ];
  }

  crearTrabajo(): void {
    this.globalService.navegar(Url.trabajo_nuevo);
  }

  eliminarTrabajo(trabajo: Trabajo): void {
    console.log('ELIMINAR TRABAJO ' + trabajo.Nombre);
  }

  verDetalle(id: number): void {
    this.globalService.navegar(Url.trabajo_detalle, id);
  }
}
