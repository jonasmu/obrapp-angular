import { Contrato } from "./contrato.model";
import { Estado } from "./estado.model";
import { Contratista } from "./contratista.model";
import { Tarea } from "./tarea.model";

export class Trabajo {
    Id: number;
    IdUsuario: number;
    Contrato: Contrato;
    Estado: Estado;
    Contratista: Contratista;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Tareas: Tarea[];
    EstaEliminado: boolean;
}