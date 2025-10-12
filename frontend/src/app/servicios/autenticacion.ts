import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  area: string;
  email: string;
  password: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class Autenticacion {
  private apiUrl = 'http://localhost:8000/api/v1/usuario/';
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor(private http: HttpClient) {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActualSubject.next(JSON.parse(usuarioGuardado));
    }
  }

  iniciarSesion(email: string, password: string): Observable<Usuario | null> {
      return this.http.post<Usuario>(`${this.apiUrl}inicio-sesion/`, { email, password }).pipe(
          map((usuario) => {
              localStorage.setItem('usuarioActual', JSON.stringify(usuario));
              this.usuarioActualSubject.next(usuario);
              return usuario;
          }),
          catchError(() => {
              return throwError(() => new Error('Credenciales inválidas'));
          })
      );
  }

  verificarEmailExistente(email: string): Observable<boolean> {
    return this.http.post<{existe: boolean}>(`${this.apiUrl}verificar-email/`, { email }).pipe(
        map((response) => response.existe)
    );
  }
  
  registrarse(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}registro/`, usuario).pipe(
        map((nuevoUsuario) => {
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
            this.usuarioActualSubject.next(nuevoUsuario);
            return nuevoUsuario;
        })
    );
}

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.usuarioActualSubject.next(null);
  }

  estarLogueado(): boolean {
    return !!localStorage.getItem('usuarioActual');
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActualSubject.value;
  }

  esAgente(): boolean {
    const usuario = this.obtenerUsuarioActual();
    return usuario?.rol === 'agente';
  }

  esUsuario(): boolean {
    const usuario = this.obtenerUsuarioActual();
    return usuario?.rol === 'usuario';
  }
}
