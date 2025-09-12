import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReclamosService, Reclamo } from '../../../../servicios/reclamos.service';
import { Autenticacion, Usuario } from '../../../../servicios/autenticacion';
@Component({
  selector: 'app-vista-usuario',
  imports: [RouterLink],
  templateUrl: './vista-usuario.html',
  styleUrl: './vista-usuario.css'
})
export class VistaUsuario  implements OnInit{
    reclamos: Reclamo[] = [];
    usuarioActual: Usuario | null = null;

  constructor(private reclamosService: ReclamosService, private autenticacion: Autenticacion) { }

  ngOnInit() {
    this.obtenerReclamosPorId();
    this.autenticacion.usuarioActual$.subscribe(usuario => this.usuarioActual = usuario);
  }

  obtenerReclamosPorId() {
    const usuarioActual = this.autenticacion.obtenerUsuarioActual();
    if (usuarioActual && usuarioActual.id) {
      this.reclamosService.obtenerReclamosPorId(usuarioActual.id).subscribe(reclamos => {
        this.reclamos = reclamos;
        console.log('Reclamos del usuario:', this.reclamos);
      });
    }
  }
}

