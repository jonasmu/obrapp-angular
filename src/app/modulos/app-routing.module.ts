import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutentificacionGuard } from '../guardias/autentificacion.guard';

import { InicioComponent } from '../componentes/inicio/inicio.component'
import { SesionComponent } from '../componentes/sesion/sesion.component'
import { TrabajosComponent } from '../componentes/trabajos/trabajos.component'
import { TrabajoEditarComponent } from '../componentes/trabajo-editar/trabajo-editar.component';
import { TrabajoDetalleComponent } from '../componentes/trabajo-detalle/trabajo-detalle.component';
import { TareaEditarComponent } from '../componentes/tarea-editar/tarea-editar.component';
import { PagosComponent } from '../componentes/pagos/pagos.component';
import { PagoEditarComponent } from '../componentes/pago-editar/pago-editar.component';
import { ContratistasComponent } from '../componentes/contratistas/contratistas.component'
import { ContratistaEditarComponent } from '../componentes/contratista-editar/contratista-editar.component';
import { ContratistaDetalleComponent } from '../componentes/contratista-detalle/contratista-detalle.component';
import { Parametro } from '../modelos/parametro.model';
import { Url } from '../modelos/url.model';

const routes: Routes = [
  { path: Url.raiz, redirectTo: '/', pathMatch: 'full' },
  { path: Url.raiz, component: InicioComponent },

  { path: Url.sesion, component: SesionComponent },

  { path: Url.trabajos, component: TrabajosComponent, canActivate: [AutentificacionGuard] },
  { path: Url.trabajo_nuevo, component: TrabajoEditarComponent, canActivate: [AutentificacionGuard] },
  { path: Url.trabajo_editar, component: TrabajoEditarComponent, canActivate: [AutentificacionGuard] },
  { path: Url.trabajo_detalle, component: TrabajoDetalleComponent, canActivate: [AutentificacionGuard] },

  { path: Url.tarea_nueva, component: TareaEditarComponent, canActivate: [AutentificacionGuard] },
  { path: Url.tarea_editar, component: TareaEditarComponent, canActivate: [AutentificacionGuard] },

  { path: Url.pagos, component: PagosComponent, canActivate: [AutentificacionGuard] },
  { path: Url.pago_nuevo, component: PagoEditarComponent, canActivate: [AutentificacionGuard] },
  { path: Url.pago_editar, component: PagoEditarComponent, canActivate: [AutentificacionGuard] },

  { path: Url.contratistas, component: ContratistasComponent, canActivate: [AutentificacionGuard] },
  { path: Url.contratista_nuevo, component: ContratistaEditarComponent, canActivate: [AutentificacionGuard] },
  { path: Url.contratista_editar, component: ContratistaEditarComponent, canActivate: [AutentificacionGuard] },
  { path: Url.contratista_detalle, component: ContratistaDetalleComponent, canActivate: [AutentificacionGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
