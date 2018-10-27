import { Component } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'obrapp';

  manejarUsuario(): void {
    console.log('GOLAAA');
    
    // this.titulo = 'CLICK';
    // if (usuario) {
    //   this.titulo = usuario.Nombre;
    // }
  }

}