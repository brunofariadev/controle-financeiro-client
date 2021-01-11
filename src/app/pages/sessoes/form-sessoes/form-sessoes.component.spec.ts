import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSessoesComponent } from './form-sessoes.component';

describe('FormSessoesComponent', () => {
  let component: FormSessoesComponent;
  let fixture: ComponentFixture<FormSessoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSessoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSessoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
