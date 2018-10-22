import { TrabajoTipo } from "./trabajo-tipo.model";
import { Estado } from "./estado.model";
import { Contratista } from "./contratista.model";
import { Tarea } from "./tarea.model";

export class Trabajo {
    Id: number;
    IdUsuario: number;
    Tipo: TrabajoTipo;
    Estado: Estado;
    Contratista: Contratista;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Tareas: Tarea[]
}