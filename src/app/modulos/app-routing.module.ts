import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutentificacionGuard } from '../guardias/autentificacion.guard';

import { InicioComponent } from '../componentes/inicio/inicio.component'
import { SesionComponent } from '../componentes/sesion/sesion.component'
import { TrabajosComponent } from '../componentes/trabajos/trabajos.component'
import { TrabajoDetalleComponent } from '../componentes/trabajo-detalle/trabajo-detalle.component';
import { ContratistasComponent } from '../componentes/contratistas/contratistas.component'
import { ContratistaDetalleComponent } from '../componentes/contratista-detalle/contratista-detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: InicioComponent },
  { path: 'sesion', component: SesionComponent },
  { path: 'trabajos', component: TrabajosComponent, canActivate: [AutentificacionGuard] },
  { path: 'trabajos/nuevo', component: TrabajoDetalleComponent, canActivate: [AutentificacionGuard] },
  { path: 'contratistas', component: ContratistasComponent, canActivate: [AutentificacionGuard] },
  { path: 'contratistas/nuevo', component: ContratistaDetalleComponent, canActivate: [AutentificacionGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
