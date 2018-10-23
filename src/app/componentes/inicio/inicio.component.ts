import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Usuario } from 'src/app/modelos/usuario.model';

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
    private sesionService: SesionService,
    private trabajosService: TrabajosService,
    private contratistasService: ContratistasService
  ) { }

  ngOnInit() {
    this.cargarUsuario();
    this.cargarTrabajos();
    this.cargarContratistas();
  }

  cargarUsuario(): void {
    this.usuario = this.sesionService.obtener();
  }

  cargarTrabajos(): void {
    this.trabajos = [];
    this.trabajosService.obtenerPorUsuario().subscribe(
      res => this.trabajos = res,
      error => console.log(error)
    );
  }

  cargarContratistas(): void {
    this.contratistas = [];
    this.contratistasService.obtenerTodos().subscribe(
      res => this.contratistas = res,
      error => console.log(error)
    );
  }

}
