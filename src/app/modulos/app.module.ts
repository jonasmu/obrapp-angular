import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from '../componentes/app/app.component';
import { InicioComponent } from '../componentes/inicio/inicio.component'
import { MenuComponent } from '../componentes/menu/menu.component'
import { SesionComponent } from '../componentes/sesion/sesion.component';
import { TrabajosComponent } from '../componentes/trabajos/trabajos.component';
import { TrabajoEditarComponent } from '../componentes/trabajo-editar/trabajo-editar.component';
import { TrabajoDetalleComponent } from '../componentes/trabajo-detalle/trabajo-detalle.component';
import { ContratistasComponent } from '../componentes/contratistas/contratistas.component';
import { ContratistaEditarComponent } from '../componentes/contratista-editar/contratista-editar.component';

import { httpInterceptorProviders } from '../interceptores/index';

import { AutentificacionGuard } from '../guardias/autentificacion.guard';

import { ApiService } from '../servicios/api.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { SesionService } from '../servicios/sesion.service';
import { TrabajosService } from '../servicios/trabajos.service';
import { ContratistasService } from '../servicios/contratistas.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    SesionComponent,
    TrabajosComponent,
    TrabajoEditarComponent,
    TrabajoDetalleComponent,
    ContratistasComponent,
    ContratistaEditarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    // Interceptores:
    httpInterceptorProviders,
    // Guardias:
    AutentificacionGuard,
    // Servicios:
    ApiService,
    UsuariosService,
    SesionService,
    TrabajosService,
    ContratistasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
