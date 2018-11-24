import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Material } from '@modelos/material-model';
import { GlobalService } from '@servicios/global.service';
import { MaterialesService } from '@servicios/materiales.service';
import { ActivatedRoute } from '@angular/router';
import { Parametro } from '@modelos/parametro.model';
import { Url } from '@modelos/url.model';

@Component({
  selector: 'app-material-editar',
  templateUrl: './material-editar.component.html',
  styleUrls: ['./material-editar.component.css']
})
export class MaterialEditarComponent implements OnInit {

  idTrabajo: number;
  material: Material;
  esCrear: boolean;

  formulario = this.fb.group({
    nombre: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    observaciones: this.fb.control(''),
    precio: this.fb.control(''),
    estaAdquirido: this.fb.control('')
  });

  get nombre() { return this.formulario.get('nombre'); }
  get observaciones() { return this.formulario.get('observaciones'); }
  get precio() { return this.formulario.get('precio'); }
  get estaAdquirido() { return this.formulario.get('estaAdquirido'); }

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private materialesService: MaterialesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.idTrabajo = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdTrabajo);
    this.inicializarMaterial();
  }

  inicializarMaterial(): void {
    let url = this.globalService.mapearUrl(Url.material_nuevo, this.idTrabajo);
    if (this.globalService.urlIncluye(url)) {
      this.esCrear = true;
      this.resetearMaterial();
    }
    else {
      this.esCrear = false;
      let idMaterial = this.globalService.obtenerIdDeUrl(this.route, Parametro.IdMaterial);
      this.materialesService.obtenerPorId(idMaterial).subscribe(
        res => {
          this.material = res;
          this.cargarFormulario();
        },
        error => this.globalService.manejarError(error)
      );
    }
  }

  aceptar(evento: Event) {
    evento.preventDefault();
    if (!this.formulario.valid) {
      this.globalService.notificar('El formulario no es válido');
      return;
    }
    this.volcarFormulario();
    if (this.esCrear) {
      this.materialesService.crear(this.material).subscribe(
        res => {
          if (this.globalService.confirmarAccion('¿Querés cargar otro material más?')) {
            this.resetearMaterial();
          }
          else {
            this.globalService.navegar(Url.trabajo_detalle, this.material.IdTrabajo);
          }
        },
        error => this.globalService.manejarError(error)
      );
    }
    else if (this.globalService.confirmarAccion('¿Actualizar material?')) {
      this.materialesService.actualizar(this.material).subscribe(
        res => this.globalService.navegar(Url.trabajo_detalle, this.material.IdTrabajo),
        error => this.globalService.manejarError(error)
      );
    }
  }

  cancelar(evento: Event) {
    evento.preventDefault();
    this.globalService.volver();
  }

  seleccionarContenido($event) {
    $event.target.select();
  }

  resetearMaterial(): void {
    this.material = new Material();
    this.material.Id = 0;
    this.material.IdTrabajo = this.idTrabajo;
    this.material.Nombre = '';
    this.material.Observaciones = '';
    this.material.Precio = 0;
    this.material.EstaAdquirido = false;

    this.nombre.setValue('');
    this.observaciones.setValue('');
    this.precio.setValue(0);
    this.estaAdquirido.setValue(false);
  }

  cargarFormulario(): void {
    this.nombre.setValue(this.material.Nombre);
    this.observaciones.setValue(this.material.Observaciones);
    this.precio.setValue(this.material.Precio);
    this.estaAdquirido.setValue(this.material.EstaAdquirido);
  }

  volcarFormulario(): void {
    this.material.Nombre = this.nombre.value;
    this.material.Observaciones = this.observaciones.value;
    this.material.Precio = this.precio.value;
    this.material.EstaAdquirido = this.estaAdquirido.value;
  }
}
