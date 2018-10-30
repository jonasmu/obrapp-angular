import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { SesionService } from 'src/app/servicios/sesion.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Url } from 'src/app/modelos/url.model';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private sesionService: SesionService) {}

  ngOnInit() {
    this.usuario = this.sesionService.obtenerUsuario();
  }

  iniciarSesion(nombre: string, clave: string, evento: Event): void {
    // Quita funcionalidad de envio de formulario
    evento.preventDefault();

    // Llama al servicio para iniciar sesion del usuario pegandole a la API.
    this.sesionService.iniciar(nombre, clave).subscribe(
      res => {
        this.usuario = res;
        this.sesionService.guardar(res);
        let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.globalService.navegar(returnUrl);
      },
      error => this.globalService.manejarError(error)
    );
  }

  cerrarSesion(evento: Event): void {
    evento.preventDefault();
    this.sesionService.cerrar();
    this.globalService.navegar(Url.raiz);
  }
}
