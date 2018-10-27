import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/modelos/material-model';
import { GlobalService } from 'src/app/servicios/global.service';
import { MaterialesService } from 'src/app/servicios/materiales.service';
import { ActivatedRoute } from '@angular/router';
import { Parametro } from 'src/app/modelos/parametro.model';
import { Url } from 'src/app/modelos/url.model';

@Component({
  selector: 'app-material-editar',
  templateUrl: './material-editar.component.html',
  styleUrls: ['./material-editar.component.css']
})
export class MaterialEditarComponent implements OnInit {

  material: Material;
  esCrear: boolean;

  constructor(
    private globalService: GlobalService,
    private materialesService: MaterialesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inicializarMaterial();
  }

  inicializarMaterial(): void {
    let idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    let url = this.globalService.mapearUrl(Url.material_nuevo, idTrabajo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.material = {
        Id: 0,
        IdTrabajo: idTrabajo,
        NombreTrabajo: '',
        Nombre: '',
        Observaciones: '',
        Precio: 0,
        EstaAdquirido: false,
        EstaEliminado: false
      };
    }
    else {
      this.esCrear = false;
      let idMaterial = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdMaterial);
      this.materialesService.obtenerPorId(idMaterial).subscribe(
        res => this.material = res,
        error => this.globalService.notificarError(error)
      );
    }
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (this.esCrear) {
      this.materialesService.crear(this.material).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.material.IdTrabajo),
        error => this.globalService.notificarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar material?')) {
      this.materialesService.actualizar(this.material).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.material.IdTrabajo),
        error => this.globalService.notificarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }
}
