import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratista-detalle',
  templateUrl: './contratista-detalle.component.html',
  styleUrls: ['./contratista-detalle.component.css']
})
export class ContratistaDetalleComponent implements OnInit {

  contratista: Contratista;

  constructor(
    private contratistasService: ContratistasService,
    private router: Router,
    private location: Location) {
    this.contratista = {
      Nombre: '',
      Apellido: '',
      Telefono: '',
      Domicilio: '',
      Observaciones: ''
    };
  }

  ngOnInit() {
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
