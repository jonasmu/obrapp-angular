import { Component, OnInit } from '@angular/core';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/servicios/global.service';
import { Url } from 'src/app/modelos/url.model';

@Component({
  selector: 'app-contratistas',
  templateUrl: './contratistas.component.html',
  styleUrls: ['./contratistas.component.css']
})
export class ContratistasComponent implements OnInit {
  contratistas: Contratista[];
  columnasDeTabla: string[];

  constructor(
    private globalService: GlobalService,
    private contratistasService: ContratistasService) { }

  ngOnInit() {
    this.obtenerContratistas();
    this.establecerColumnasDeTabla();
  }

  obtenerContratistas() {
    this.contratistasService.obtenerTodos().subscribe(
      res => this.contratistas = res,
      error => this.globalService.manejarError(error)
    );
  }

  establecerColumnasDeTabla(): void {
    this.columnasDeTabla = [
      'detalle',
      'nombreApellido',
      'telefono',
      'domicilio',
      'observaciones'
    ];
  }

  crearContratista(): void {
    this.globalService.navegar(Url.contratista_nuevo);
  }

  eliminarContratista(contratista: Contratista): void {
    console.log('ELIMINAR CONTRATISTA ' + contratista.Nombre);
  }

  verDetalle(id: number): void {
    this.globalService.navegar(Url.contratista_detalle, id);
  }
}
