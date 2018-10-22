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

  constructor(
    private router: Router,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.obtenerTrabajos();
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

  crearTrabajo(): void {
    this.router.navigateByUrl('trabajos/nuevo');
  }
}
