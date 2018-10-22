import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../servicios/sesion.service'
import { Usuario } from 'src/app/modelos/usuario.model';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: Usuario = this.autentificacionService.obtener();

  constructor(
    private autentificacionService: SesionService) { }

  ngOnInit() {
  }

  cerrarSesion(): void {
    this.autentificacionService.cerrar();
    window.location.reload();
  }
}
