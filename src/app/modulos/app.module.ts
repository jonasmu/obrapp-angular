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
import { TareaEditarComponent } from '../componentes/tarea-editar/tarea-editar.component';
import { PagosComponent } from '../componentes/pagos/pagos.component';
import { PagoEditarComponent } from '../componentes/pago-editar/pago-editar.component';
import { ContratistasComponent } from '../componentes/contratistas/contratistas.component';
import { ContratistaEditarComponent } from '../componentes/contratista-editar/contratista-editar.component';
import { ContratistaDetalleComponent } from '../componentes/contratista-detalle/contratista-detalle.component';

import { httpInterceptorProviders } from '../interceptores/index';

import { AutentificacionGuard } from '../guardias/autentificacion.guard';

import { UsuariosService } from '../servicios/usuarios.service';
import { SesionService } from '../servicios/sesion.service';
import { TrabajosService } from '../servicios/trabajos.service';
import { TareasService } from '../servicios/tareas.service';
import { ContratistasService } from '../servicios/contratistas.service';
import { PagosService } from '../servicios/pagos.service';
import { GlobalService } from '../servicios/global.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    SesionComponent,
    TrabajosComponent,
    TrabajoEditarComponent,
    TrabajoDetalleComponent,
    TareaEditarComponent,
    PagosComponent,
    PagoEditarComponent,
    ContratistasComponent,
    ContratistaEditarComponent,
    ContratistaDetalleComponent
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
    UsuariosService,
    SesionService,
    TrabajosService,
    TareasService,
    ContratistasService,
    PagosService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
