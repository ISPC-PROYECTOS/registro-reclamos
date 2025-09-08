import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  area: string;
  email: string;
  password: string;
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

  registrarse(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario)
      .pipe(
        map(nuevoUsuario => {
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
}