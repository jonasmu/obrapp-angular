import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: Usuario;
  trabajos: Trabajo[];
  contratistas: Contratista[];

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
      // this.cargarContratistas();
    }
  }

  cargarUsuario(): void {
    this.usuario = this.sesionService.obtenerUsuario();
  }

  cargarTrabajos(): void {
    this.trabajosService.obtenerPorUsuario().subscribe(
      res => this.trabajos = res,
      error => this.globalService.notificarError(error)
    );
  }

  cargarContratistas(): void {
    this.contratistasService.obtenerTodos().subscribe(
      res => this.contratistas = res,
      error => this.globalService.notificarError(error)
    );
  }

}
