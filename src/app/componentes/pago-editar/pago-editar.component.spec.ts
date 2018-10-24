import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEditarComponent } from './pago-editar.component';

describe('PagoEditarComponent', () => {
  let component: PagoEditarComponent;
  let fixture: ComponentFixture<PagoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
