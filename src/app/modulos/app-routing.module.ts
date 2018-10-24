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

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: InicioComponent },

  { path: 'sesion', component: SesionComponent },

  { path: 'trabajos', component: TrabajosComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajo/nuevo', component: TrabajoEditarComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajo/editar/:idTrabajo', component: TrabajoEditarComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajo/:idTrabajo', component: TrabajoDetalleComponent, canActivate: [AutentificacionGuard] },

  { path: 'trabajo/:idTrabajo/tarea/nueva', component: TareaEditarComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajo/:idTrabajo/tarea/editar/:idTarea', component: TareaEditarComponent, canActivate: [AutentificacionGuard] },

  { path: 'trabajo/:idTrabajo/pago/nuevo', component: PagoEditarComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajo/:idTrabajo/pago/editar/:idPago', component: PagoEditarComponent, canActivate: [AutentificacionGuard] },

  { path: 'pagos', component: PagosComponent, canActivate: [AutentificacionGuard] },
  
  { path: 'contratistas', component: ContratistasComponent, canActivate: [AutentificacionGuard] },
  { path: 'contratista/nuevo', component: ContratistaEditarComponent, canActivate: [AutentificacionGuard] },
  { path: 'contratista/editar/:idContratista', component: ContratistaEditarComponent, canActivate: [AutentificacionGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
