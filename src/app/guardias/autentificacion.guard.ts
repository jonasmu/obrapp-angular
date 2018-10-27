import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SesionService } from 'src/app/servicios/sesion.service';

@Injectable()
export class AutentificacionGuard implements CanActivate {

    constructor(
        private autentificacionService: SesionService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.autentificacionService.obtenerUsuario()) {
            return true;
        }
        this.router.navigate(['/sesion'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}