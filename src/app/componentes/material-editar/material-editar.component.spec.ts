import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEditarComponent } from './material-editar.component';

describe('MaterialEditarComponent', () => {
  let component: MaterialEditarComponent;
  let fixture: ComponentFixture<MaterialEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
