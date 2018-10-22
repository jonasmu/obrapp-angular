import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  usuario: Usuario = this.autentificacionService.obtener();
  
  constructor(
    private router: Router,
    private autentificacionService: SesionService) { }

  ngOnInit() {
  }

  iniciarSesion(nombre: string, clave: string, evento: Event):void {
    // Quita funcionalidad de envio de formulario
    evento.preventDefault();

    // Llama al servicio para iniciar sesion del usuario pegandole a la API.
    this.autentificacionService.iniciar(nombre, clave).subscribe(
      res => {
        this.autentificacionService.guardar(res);
      },
      error => {
        console.error(error);
      },
      () => {
        this.router.navigateByUrl('/');
        window.location.reload();
      }
    );
  }

  cerrarSesion(evento: Event):void{
    evento.preventDefault();
    this.autentificacionService.cerrar();
    window.location.reload();
  }
}
