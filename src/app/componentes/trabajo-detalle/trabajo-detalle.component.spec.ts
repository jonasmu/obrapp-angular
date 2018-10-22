import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoDetalleComponent } from './trabajo-detalle.component';

describe('TrabajoDetalleComponent', () => {
  let component: TrabajoDetalleComponent;
  let fixture: ComponentFixture<TrabajoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
