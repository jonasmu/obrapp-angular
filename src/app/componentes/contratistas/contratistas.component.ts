import { Component, OnInit } from '@angular/core';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratistas',
  templateUrl: './contratistas.component.html',
  styleUrls: ['./contratistas.component.css']
})
export class ContratistasComponent implements OnInit {
  contratistas: Contratista[];
  columnasDeTabla: string[];

  constructor(
    private router: Router,
    private contratistasService: ContratistasService) { }

  ngOnInit() {
    this.obtenerContratistas();
    this.establecerColumnasDeTabla();
  }

  obtenerContratistas() {
    this.contratistasService.obtenerTodos().subscribe(
      res => {
        this.contratistas = res
      },
      error => {
        console.error(error);
      }
    );
  }

  establecerColumnasDeTabla(): void {
    this.columnasDeTabla = ['detalle', 'nombreApellido', 'telefono', 'domicilio', 'observaciones'];
  }

  crearContratista(): void {
    this.router.navigateByUrl('contratista/nuevo');
  }

  eliminarContratista(contratista: Contratista): void {
    console.log('ELIMINAR CONTRATISTA ' + contratista.Nombre);
  }

  verDetalle(id: number): void {
    this.router.navigateByUrl(`contratista/${id}`);
  }
}
