import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/servicios/global.service';
import { Url } from 'src/app/modelos/url.model';
import { Parametro } from 'src/app/modelos/parametro.model';

@Component({
  selector: 'app-contratista-editar',
  templateUrl: './contratista-editar.component.html',
  styleUrls: ['./contratista-editar.component.css']
})
export class ContratistaEditarComponent implements OnInit {

  contratista: Contratista;
  esCrear: boolean;

  constructor(
    private globalService: GlobalService,
    private contratistasService: ContratistasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inicializarContratista();
  }

  inicializarContratista(): void {
    let url = this.globalService.mapearUrl(Url.contratista_nuevo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.contratista = {
        Id: 0,
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Domicilio: '',
        Observaciones: '',
        EstaEliminado: false
      };
    }
    else {
      this.esCrear = false;
      let idContratista = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdContratista);
      this.contratistasService.obtenerPorId(idContratista).subscribe(
        res => this.contratista = res,
        error => this.globalService.notificarError(error)
      );
    }
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (this.esCrear) {



      this.contratistasService.crear(this.contratista).subscribe(
        res => this.globalService.navegar(Url.contratistas),
        error => this.globalService.notificarError(error)
      );




      
    }
    else if (this.globalService.confirmarAccion('¿Actualizar contratista?')) {
      this.contratistasService.actualizar(this.contratista).subscribe(
        res => this.globalService.navegar(Url.contratista_detalle, this.contratista.Id),
        error => this.globalService.notificarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }
}
