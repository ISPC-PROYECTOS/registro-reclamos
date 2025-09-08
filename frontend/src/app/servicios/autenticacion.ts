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
  providedIn: 'root'
})
export class Autenticacion {
  private apiUrl = 'http://localhost:3000/usuarios';
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor(private http: HttpClient) {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActualSubject.next(JSON.parse(usuarioGuardado));
    }
  }

  iniciarSesion(email: string, password: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(usuarios => {
          if (usuarios.length > 0) {
            const usuario = usuarios[0];
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            this.usuarioActualSubject.next(usuario);
            return usuario;
          }
          return null;
        })
      );
  }

  verificarEmailExistente(email: string): Observable<boolean> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`)
      .pipe(
        map(usuarios => usuarios.length > 0),
        catchError(error => {
          console.error('Error al verificar email:', error);
          return throwError(() => error);
        })
      );
  }
  registrarse(usuario: Usuario): Observable<Usuario> {
    return this.verificarEmailExistente(usuario.email).pipe(
      switchMap(emailExiste => {
        if (emailExiste) {
          throw new Error('EMAIL_YA_REGISTRADO');
        }
        return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
          map(nuevoUsuario => {
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
            this.usuarioActualSubject.next(nuevoUsuario);
            return nuevoUsuario;
          }),
          catchError(error => {
            console.error('Error al registrar usuario:', error);
            return throwError(() => error);
          })
        );
      }),
      catchError(error => {
        if (error.message === 'EMAIL_YA_REGISTRADO') {
          return throwError(() => ({ type: 'EMAIL_DUPLICADO', message: 'Este email ya está registrado' }));
        }
        return throwError(() => error);
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