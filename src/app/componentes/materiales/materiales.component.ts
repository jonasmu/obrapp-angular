import { Component, OnInit } from '@angular/core';
import { Material } from '@modelos/material-model';
import { MaterialesService } from '@servicios/materiales.service';
import { GlobalService } from '@servicios/global.service';
import { Url } from '@modelos/url.model';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  materiales: Material[];
  columnasDeTablaMateriales: string[];

  constructor(
    private globalService: GlobalService,
    private materialesService: MaterialesService) { }

  ngOnInit() {
    this.columnasDeTablaMateriales = [
      // 'editar',
      // 'eliminar',
      'trabajo',
      'nombre',
      'observaciones',
      'estado',
      'precio'
    ];
    this.cargarMateriales();
  }

  cargarMateriales(): void {
    this.materialesService.obtenerPorUsuario().subscribe(
      res => this.materiales = res,
      error => this.globalService.manejarError(error)
    );
  }

  verTrabajo(id:number):void{
    this.globalService.navegar(Url.trabajo_detalle, id);
  }
}
