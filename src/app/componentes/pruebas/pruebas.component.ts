import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  formularioPrueba = this.fb.group({
    nombre: ['', Validators.maxLength(4)],
    apellido: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  aceptar(): void {
    if(this.formularioPrueba.status == 'VALID'){
      console.log('OK');
    }
    else{
      console.log('INVALIDO');
    }
  }

  get nombre() { return this.formularioPrueba.get('nombre'); }

  getErrorMessage() {
    return this.nombre.errors.required ? 'You must enter a value' :
        this.nombre.errors.email ? 'Not a valid email' :
            '';
  }

}
