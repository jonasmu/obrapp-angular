import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoEditarComponent } from './trabajo-editar.component';

describe('TrabajoEditarComponent', () => {
  let component: TrabajoEditarComponent;
  let fixture: ComponentFixture<TrabajoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
