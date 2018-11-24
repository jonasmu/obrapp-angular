import { Component, OnInit } from '@angular/core';
import { SesionService } from '@servicios/sesion.service'
import { Usuario } from '@modelos/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: Usuario = null;

  constructor(
    private sesionService: SesionService) {
  }

  ngOnInit() {
    let usuario = this.sesionService.obtenerUsuario();
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.usuario = this.sesionService.obtenerUsuario();
    this.sesionService.establecerUsuarioObservado(this.usuario);
    this.sesionService.observarUsuario().subscribe(
      res => this.usuario = res
    );
  }
}
