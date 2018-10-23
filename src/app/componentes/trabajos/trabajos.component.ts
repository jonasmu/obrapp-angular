import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {
  trabajos: Trabajo[];
  columnasDeTabla: string[];

  constructor(
    private router: Router,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.obtenerTrabajos();
    this.establecerColumnasDeTabla();
  }

  obtenerTrabajos() {
    this.trabajosService.obtenerPorUsuario().subscribe(
      res => {
        this.trabajos = res
      },
      error => {
        console.error(error);
      }
    );
  }

  establecerColumnasDeTabla(): void {
    this.columnasDeTabla = ['detalle', 'eliminar', 'nombre', 'estado', 'contratista', 'tipo', 'precio'];
  }

  crearTrabajo(): void {
    this.router.navigateByUrl('trabajo/nuevo');
  }

  eliminarTrabajo(trabajo: Trabajo): void {
    console.log('ELIMINAR TRABAJO ' + trabajo.Nombre);
  }

  verDetalle(id: number): void {
    console.log('DETALLE TRABAJO ' + id);
    this.router.navigateByUrl('trabajo/' + id);
  }
}
