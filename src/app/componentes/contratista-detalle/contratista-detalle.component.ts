import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Contratista } from 'src/app/modelos/contratista.model';
import { Trabajo } from 'src/app/modelos/trabajo.model';

@Component({
  selector: 'app-contratista-detalle',
  templateUrl: './contratista-detalle.component.html',
  styleUrls: ['./contratista-detalle.component.css']
})
export class ContratistaDetalleComponent implements OnInit {

  contratista: Contratista;
  trabajos: Trabajo[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contratistasService: ContratistasService,
    private trabajosService: TrabajosService) { }

  ngOnInit() {
    this.cargarContratista();
  }

  cargarContratista(): void {
    let idContratista: number;
    this.route.params.subscribe(params => {
      idContratista = params['idContratista']
    });
    this.contratistasService.obtenerPorId(idContratista).subscribe(
      res => {
        this.contratista = res;
        this.cargarTrabajos();
      },
      error => {
        console.error(error);
        this.location.back();
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
    this.router.navigateByUrl(`contratista/editar/${this.contratista.Id}`);
  }

  eliminarContratista(): void {
    if (confirm(`¿Seguro que querés eliminar al contratista:\n${this.contratista.Nombre} ${this.contratista.Apellido}?`)) {
      this.contratistasService.eliminar(this.contratista.Id).subscribe(
        res => this.router.navigateByUrl('contratistas'),
        error => console.error(error)
      );
    }
  }

}
