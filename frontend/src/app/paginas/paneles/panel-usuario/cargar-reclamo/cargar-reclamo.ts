import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cargar-reclamo',
  imports: [ReactiveFormsModule],
  templateUrl: './cargar-reclamo.html',
  styleUrl: './cargar-reclamo.css'
})
export class CargarReclamo {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(300)]],
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