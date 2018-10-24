import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratistaDetalleComponent } from './contratista-detalle.component';

describe('ContratistaDetalleComponent', () => {
  let component: ContratistaDetalleComponent;
  let fixture: ComponentFixture<ContratistaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratistaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratistaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
