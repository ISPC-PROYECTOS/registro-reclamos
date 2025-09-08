import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Autenticacion, Usuario } from '../../servicios/autenticacion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  usuarioActual: Usuario | null = null;
  private suscripcionUsuario: Subscription = new Subscription();

  constructor(
    private autenticacion: Autenticacion,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suscripcionUsuario = this.autenticacion.usuarioActual$.subscribe(
      usuario => {
        this.usuarioActual = usuario;
      }
    );
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
  }

  get estaLogueado(): boolean {
    return this.usuarioActual !== null;
  }

  get esAgente(): boolean {
    return this.usuarioActual?.rol === 'agente';
  }

  get esUsuario(): boolean {
    return this.usuarioActual?.rol === 'usuario';
  }

  cerrarSesion(): void {
    this.autenticacion.cerrarSesion();
    this.router.navigate(['/inicio-sesion']);
  }
}