import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutentificacionGuard } from '../guardias/autentificacion.guard';

import { InicioComponent } from '../componentes/inicio/inicio.component'
import { SesionComponent } from '../componentes/sesion/sesion.component'
import { TrabajosComponent } from '../componentes/trabajos/trabajos.component'
import { TrabajoEditarComponent } from '../componentes/trabajo-editar/trabajo-editar.component';
import { TrabajoDetalleComponent } from '../componentes/trabajo-detalle/trabajo-detalle.component';
import { ContratistasComponent } from '../componentes/contratistas/contratistas.component'
import { ContratistaEditarComponent } from '../componentes/contratista-editar/contratista-editar.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: InicioComponent },
  { path: 'sesion', component: SesionComponent },
  { path: 'trabajos', component: TrabajosComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajo/nuevo', component: TrabajoEditarComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajo/:id', component: TrabajoDetalleComponent, canActivate: [AutentificacionGuard] },
  { path: 'contratistas', component: ContratistasComponent, canActivate: [AutentificacionGuard] },
  { path: 'contratista/nuevo', component: ContratistaEditarComponent, canActivate: [AutentificacionGuard] },
  { path: 'contratista/:id', component: ContratistaEditarComponent, canActivate: [AutentificacionGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
