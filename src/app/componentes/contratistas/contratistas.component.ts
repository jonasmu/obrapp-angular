import { Component, OnInit } from '@angular/core';
import { Contratista } from 'src/app/modelos/contratista.model';
import { ContratistasService } from 'src/app/servicios/contratistas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratistas',
  templateUrl: './contratistas.component.html',
  styleUrls: ['./contratistas.component.css']
})
export class ContratistasComponent implements OnInit {
  contratistas: Contratista[];

  constructor(
    private router: Router,
    private contratistasService: ContratistasService) { }

  ngOnInit() {
    this.obtenerContratistas();
  }

  obtenerContratistas() {
    this.contratistasService.obtenerTodos().subscribe(
      res => {
        this.contratistas = res
      },
      error => {
        console.error(error);
      }
    );
  }

  crearContratista(): void {
    this.router.navigateByUrl('contratistas/nuevo');
  }
}
