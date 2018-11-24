import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '@servicios/trabajos.service';
import { Trabajo } from '@modelos/trabajo.model';
import { Contratista } from '@modelos/contratista.model';
import { ContratistasService } from '@servicios/contratistas.service';
import { SesionService } from '@servicios/sesion.service';
import { Usuario } from '@modelos/usuario.model';
import { GlobalService } from '@servicios/global.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: Usuario;
  trabajos: Trabajo[];
  contratistas: Contratista[];
  cantidadUltimos: number = 5;

  constructor(
    private globalService: GlobalService,
    private sesionService: SesionService,
    private trabajosService: TrabajosService,
    private contratistasService: ContratistasService
  ) { }

  ngOnInit() {
    this.cargarUsuario();
    if (this.usuario) {
      this.cargarTrabajos();
      this.cargarContratistas();
    }
  }

  cargarUsuario(): void {
    this.usuario = this.sesionService.obtenerUsuario();
  }

  cargarTrabajos(): void {
    this.trabajosService.obtenerPorUsuario().subscribe(
      res => this.trabajos = res,
      error => this.globalService.manejarError(error)
    );
  }

  cargarContratistas(): void {
    this.contratistasService.obtenerTodos().subscribe(
      res => this.contratistas = res,
      error => this.globalService.manejarError(error)
    );
  }

  obtenerUltimosTrabajos(): Trabajo[]{
    if (this.trabajos==null){
      return [];
    }
    return this.trabajos.filter(x => x.Estado.Id == 1 || x.Estado.Id == 2).slice(0, this.cantidadUltimos);
  }

  obtenerUltimosContratistas(): Contratista[]{
    if (this.contratistas==null){
      return [];
    }
    return this.contratistas.slice(0, this.cantidadUltimos);
  }

}
