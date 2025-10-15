import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
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
          catchError((error: HttpErrorResponse) => {
        let mensajeError = 'Error al iniciar sesión';
        
        if (error.status === 401) {
          mensajeError = error.error?.error || 'Email o contraseña incorrectos';
        } else if (error.status === 400) {
          mensajeError = 'Datos inválidos';
        } else if (error.status === 0) {
          mensajeError = 'No se pudo conectar con el servidor';
        }
        
        return throwError(() => new Error(mensajeError));
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
        }),
    catchError((error: HttpErrorResponse) => {
        let mensajeError = 'Error al registrarse';
        
        if (error.status === 400 && error.error?.type === 'EMAIL_DUPLICADO') {
          mensajeError = error.error.message;
        }
        
        return throwError(() => new Error(mensajeError));
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
