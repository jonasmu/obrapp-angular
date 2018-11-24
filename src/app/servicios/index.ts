import { ContratistasService } from '@servicios/contratistas.service';
import { GlobalService } from '@servicios/global.service';
import { MaterialesService } from '@servicios/materiales.service';
import { PagosService } from '@servicios/pagos.service';
import { SesionService } from '@servicios/sesion.service';
import { TareasService } from '@servicios/tareas.service';
import { TrabajosService } from '@servicios/trabajos.service';

export const servicios = [
    ContratistasService,
    GlobalService,
    MaterialesService,
    PagosService,
    SesionService,
    TareasService,
    TrabajosService
];