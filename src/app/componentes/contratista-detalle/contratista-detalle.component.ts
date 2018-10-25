import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Contratista } from 'src/app/modelos/contratista.model';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { GlobalService } from 'src/app/servicios/global.service';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';

@Component({
  selector: 'app-contratista-detalle',
  templateUrl: './contratista-detalle.component.html',
  styleUrls: ['./contratista-detalle.component.css']
})
export class ContratistaDetalleComponent implements OnInit {

  contratista: Contratista;
  trabajos: Trabajo[];
  columnasDeTablaTrabajos: string[];

  constructor(
    private globalService:GlobalService,
    private route: ActivatedRoute,
    private contratistasService: ContratistasService,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.cargarContratista();
    this.establecerColumnasDeTablas();
  }

  establecerColumnasDeTablas(): void {
    this.columnasDeTablaTrabajos = ['detalle', 'nombre', 'estado', 'contrato', 'precio', 'pago'];
  }

  cargarContratista(): void {
    let idContratista = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdContratista);
    this.contratistasService.obtenerPorId(idContratista).subscribe(
      res => {
        this.contratista = res;
        this.cargarTrabajos();
      },
      error => {
        console.error(error);
        this.globalService.volver();
      }
    );
  }

  cargarTrabajos(): void {
    this.trabajos = [];
    this.trabajosService.obtenerPorContratista(this.contratista.Id).subscribe(
      res => this.trabajos = res,
      error => console.error(error)
    );
  }

  editarContratista(): void {
    this.globalService.navegar(Url.contratista_editar, this.contratista.Id);
  }

  eliminarContratista(): void {
    let nombreApellido = this.contratista == null ? '' : `${this.contratista.Nombre} ${this.contratista.Apellido}`;
    let mensaje = `¿Seguro que querés eliminar al contratista:\n${nombreApellido}?`;
    if (this.globalService.confirmarAccion(mensaje)) {
      this.contratistasService.eliminar(this.contratista.Id).subscribe(
        res => this.globalService.navegar(Url.contratistas),
        error => console.error(error)
      );
    }
  }

  verDetalle(id: number): void {
    this.globalService.navegar(Url.trabajo_detalle, id);
  }

}
