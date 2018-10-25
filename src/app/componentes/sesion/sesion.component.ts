import { Component, OnInit } from '@angular/core';
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
  usuario: Usuario = this.autentificacionService.obtener();

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private autentificacionService: SesionService) { }

  ngOnInit() {
  }

  iniciarSesion(nombre: string, clave: string, evento: Event): void {
    // Quita funcionalidad de envio de formulario
    evento.preventDefault();

    // Llama al servicio para iniciar sesion del usuario pegandole a la API.
    this.autentificacionService.iniciar(nombre, clave).subscribe(
      res => this.autentificacionService.guardar(res),
      error => this.globalService.notificarError(error),
      () => {
        let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        window.location.reload();
        this.globalService.navegar(returnUrl);
      }
    );
  }

  cerrarSesion(evento: Event): void {
    evento.preventDefault();
    this.autentificacionService.cerrar();
    window.location.reload();
    this.globalService.navegar(Url.raiz);
  }
}
