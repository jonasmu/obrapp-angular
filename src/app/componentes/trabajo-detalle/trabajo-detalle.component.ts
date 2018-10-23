import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/app/servicios/trabajos.service';
import { Trabajo } from 'src/app/modelos/trabajo.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trabajo-detalle',
  templateUrl: './trabajo-detalle.component.html',
  styleUrls: ['./trabajo-detalle.component.css']
})
export class TrabajoDetalleComponent implements OnInit {

  trabajo: Trabajo;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private trabajosService: TrabajosService
  ) { }

  ngOnInit() {
    this.cargarTrabajo();
  }

  cargarTrabajo(): void {
    let id: number;
    this.route.params.subscribe(params => {
      id = params['id']
    });
    console.log('ID DE PARAMETRO : ' + id);
    this.trabajosService.obtenerPorId(id).subscribe(
      res => this.trabajo = res,
      error => {
        console.error(error);
        this.location.back();
      } 
    );
  }

}
