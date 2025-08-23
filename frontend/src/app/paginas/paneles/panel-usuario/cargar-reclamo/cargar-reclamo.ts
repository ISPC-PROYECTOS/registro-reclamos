import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cargar-reclamo',
  standalone: true, // Esto indica que el componente no pertenece a un NgModule
  imports: [ReactiveFormsModule],
  templateUrl: './cargar-reclamo.html',
  styleUrl: './cargar-reclamo.css'
})
export class CargarReclamo {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required]
    });
  }

  onEnviar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      alert('Formulario enviado.');
    } else {
      alert('El formulario no es válido.');
      this.form.markAllAsTouched();
    }
  }

  get Descripcion() {
    return this.form.get('descripcion');
  }
  
  get Prioridad() {
    return this.form.get('prioridad');
  }
}