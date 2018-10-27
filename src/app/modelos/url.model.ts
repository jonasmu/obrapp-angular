import { Parametro } from "./parametro.model";

export class Url {
    static raiz: string = '';
    static sesion: string = 'sesion';

    static trabajos: string = 'trabajos';
    static trabajo_nuevo: string = 'trabajos/nuevo';
    static trabajo_editar: string = `trabajos/editar/:${Parametro.IdTrabajo}`;
    static trabajo_detalle: string = `trabajos/:${Parametro.IdTrabajo}`;

    static tarea_nueva: string = `trabajos/:${Parametro.IdTrabajo}/tarea/nueva`;
    static tarea_editar: string = `trabajos/:${Parametro.IdTrabajo}/tarea/editar/:${Parametro.IdTarea}`;

    static pagos: string = 'pagos';
    static pago_nuevo: string = `trabajos/:${Parametro.IdTrabajo}/pago/nuevo`;
    static pago_editar: string = `trabajos/:${Parametro.IdTrabajo}/pago/editar/:${Parametro.IdPago}`;

    static contratistas: string = 'contratistas';
    static contratista_nuevo: string = 'contratistas/nuevo';
    static contratista_editar: string = `contratistas/editar/:${Parametro.IdContratista}`;
    static contratista_detalle: string = `contratistas/:${Parametro.IdContratista}`;

    static materiales: string = 'materiales';
    static material_nuevo: string = `trabajos/:${Parametro.IdTrabajo}/material/nuevo`;
    static material_editar: string = `trabajos/:${Parametro.IdTrabajo}/material/editar/:${Parametro.IdMaterial}`;
}