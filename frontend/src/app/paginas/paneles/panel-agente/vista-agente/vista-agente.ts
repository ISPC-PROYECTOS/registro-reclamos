import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReclamosService, Reclamo } from '../../../../servicios/reclamos.service';
import { Autenticacion, Usuario } from '../../../../servicios/autenticacion';

@Component({
  selector: 'app-vista-agente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vista-agente.html',
  styleUrl: './vista-agente.css',
})
export class VistaAgente implements OnInit {
  form!: FormGroup;
  reclamoSeleccionado: Reclamo | undefined;
  reclamos: Reclamo[] = [];
  usuarioActual: Usuario | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private reclamosService: ReclamosService,
    private autenticacion: Autenticacion,
  ) {
    this.form = this.formBuilder.group({
      estado: ['', Validators.required],
      acciones: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarReclamos();
    this.autenticacion.usuarioActual$.subscribe((usuario) => (this.usuarioActual = usuario));
  }

  cargarReclamos() {
    this.reclamosService.obtenerReclamos().subscribe({
      next: (data) => (this.reclamos = data),
      error: (error) => console.error('Error al cargar reclamos', error),
    });
  }

  seleccionarReclamo(reclamo: Reclamo) {
    this.reclamoSeleccionado = reclamo;
  }

  onEnviar(event: Event) {
    event.preventDefault();
    if (this.form.valid && this.reclamoSeleccionado) {
      const nuevoEstado = this.form.value.estado;
      const acciones = this.form.value.acciones;

      this.reclamosService
        .atenderReclamo(this.reclamoSeleccionado.id!, { estado: nuevoEstado, acciones })
        .subscribe({
          next: () => {
            alert('Reclamo atendido correctamente.');
            this.form.reset();
            this.reclamoSeleccionado = undefined;
            this.cargarReclamos();
          },
          error: (error) => console.error('Error al atender reclamo', error),
        });
    } else {
      alert('Debes seleccionar un reclamo y completar el formulario.');
      this.form.markAllAsTouched();
    }
  }

  get Estado() {
    return this.form.get('estado');
  }

  get Acciones() {
    return this.form.get('acciones');
  }
}
