import { Component, OnInit } from '@angular/core';
import { Pago } from '@modelos/pago.model';
import { GlobalService } from '@servicios/global.service';
import { PagosService } from '@servicios/pagos.service';
import { Url } from '@modelos/url.model';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  pagos: Pago[];
  columnasDeTablaPagos: string[];

  constructor(
    private globalService: GlobalService,
    private pagosService: PagosService) { }

  ngOnInit() {
    this.columnasDeTablaPagos = [
      'trabajo',
      'contratista',
      'fecha',
      'observaciones',
      // 'estado',
      'monto'
    ];
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.pagosService.obtenerPorUsuario().subscribe(
      res => this.pagos = res,
      error => this.globalService.manejarError(error)
    );
  }

  verTrabajo(id: number): void {
    this.globalService.navegar(Url.trabajo_detalle, id);
  }
}
