import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratistaEditarComponent } from './contratista-editar.component';

describe('ContratistaEditarComponent', () => {
  let component: ContratistaEditarComponent;
  let fixture: ComponentFixture<ContratistaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratistaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratistaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
