import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '@modelos/usuario.model';
import { SesionService } from '@servicios/sesion.service';
import { GlobalService } from '@servicios/global.service';
import { Url } from '@modelos/url.model';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  usuario: Usuario;
  iniciandoSesion: boolean;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private sesionService: SesionService) {}

  ngOnInit() {
    this.iniciandoSesion = false;
    this.usuario = this.sesionService.obtenerUsuario();
  }

  iniciarSesion(nombre: string, clave: string, evento: Event): void {
    // Quita funcionalidad de envio de formulario
    evento.preventDefault();
    this.iniciandoSesion = true;

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
