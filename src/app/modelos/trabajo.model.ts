import { Contrato } from "./contrato.model";
import { Estado } from "./estado.model";
import { Contratista } from "./contratista.model";

export class Trabajo {
    Id: number;
    IdUsuario: number;
    Contrato: Contrato;
    Estado: Estado;
    Contratista: Contratista;
    Ayudantes: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    EstaEliminado: boolean;
    FechaInicio: Date;
    FechaFin: Date;
}