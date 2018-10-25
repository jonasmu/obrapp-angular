import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/modelos/material-model';
import { MaterialesService } from 'src/app/servicios/materiales.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Url } from 'src/app/modelos/url.model';

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
    this.materiales = [];
    this.materialesService.obtenerPorUsuario().subscribe(
      res => this.materiales = res,
      error => this.globalService.notificarError(error)
    );
  }

  verTrabajo(id:number):void{
    this.globalService.navegar(Url.trabajo_detalle, id);
  }
}
