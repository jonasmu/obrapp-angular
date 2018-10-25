import { Parametro } from "./parametro.model";

export class Url {
    static raiz: string = '';
    static sesion: string = 'sesion';

    static trabajos: string = 'trabajos';
    static trabajo_nuevo: string = 'trabajo/nuevo';
    static trabajo_editar: string = `trabajo/editar/:${Parametro.IdTrabajo}`;
    static trabajo_detalle: string = `trabajo/:${Parametro.IdTrabajo}`;

    static tarea_nueva: string = `trabajo/:${Parametro.IdTrabajo}/tarea/nueva`;
    static tarea_editar: string = `trabajo/:${Parametro.IdTrabajo}/tarea/editar/:${Parametro.IdTarea}`;

    static pagos: string = 'pagos';
    static pago_nuevo: string = `trabajo/:${Parametro.IdTrabajo}/pago/nuevo`;
    static pago_editar: string = `trabajo/:${Parametro.IdTrabajo}/pago/editar/:${Parametro.IdPago}`;

    static contratistas: string = 'contratistas';
    static contratista_nuevo: string = 'contratista/nuevo';
    static contratista_editar: string = `contratista/editar/:${Parametro.IdContratista}`;
    static contratista_detalle: string = `contratista/:${Parametro.IdContratista}`;

    static materiales: string = 'materiales';
    static material_nuevo: string = `trabajo/:${Parametro.IdTrabajo}/material/nuevo`;
    static material_editar: string = `trabajo/:${Parametro.IdTrabajo}/material/editar/:${Parametro.IdMaterial}`;
}