import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';

import { componentes } from '@componentes/index';
import { tuberias } from '@tuberias/index';
import { interceptores } from '@interceptores/index';
import { guardias } from '@guardias/index';
import { servicios } from '@servicios/index';

@NgModule({
  declarations: [
    componentes,
    tuberias
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    interceptores,
    guardias,
    servicios
  ],
  bootstrap: [ componentes[0] ]
})
export class AppModule { }
