import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratista-editar',
  templateUrl: './contratista-editar.component.html',
  styleUrls: ['./contratista-editar.component.css']
})
export class ContratistaEditarComponent implements OnInit {

  contratista: Contratista;

  constructor(
    private contratistasService: ContratistasService,
    private router: Router,
    private location: Location) {}

  ngOnInit() {
    this.inicializarContratista();
  }

  inicializarContratista():void{
    this.contratista = {
      Id: 0,
      Nombre: '',
      Apellido: '',
      Telefono: '',
      Domicilio: '',
      Observaciones: '',
      EstaEliminado: false
    };
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    this.contratistasService.crear(this.contratista).subscribe(
      res => {
        this.router.navigateByUrl('contratistas');
      },
      error => {
        console.error(error);
      }
    );
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.location.back();
  }
}
