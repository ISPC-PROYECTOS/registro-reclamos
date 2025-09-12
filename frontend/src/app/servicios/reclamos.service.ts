import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autenticacion } from './autenticacion';
import { map } from 'rxjs/operators';

export interface Reclamo {
  id?: string;
  idUsuario?: string;
  usuario: string;
  fechaHora: string;
  estado: string;
  descripcion: string;
  prioridad: string;
  acciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {

  private apiUrl = 'http://localhost:3000/reclamos';
  private autenticacion: Autenticacion;

  constructor(private http: HttpClient, autenticacion: Autenticacion) {
    this.autenticacion = autenticacion;
    const usuarioActual = this.autenticacion.obtenerUsuarioActual();
  }

  obtenerReclamos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(this.apiUrl);
  }

  crearReclamo(nuevoReclamo: Reclamo): Observable<Reclamo> {
    return this.http.post<Reclamo>(this.apiUrl, nuevoReclamo);
  }

  atenderReclamo(id: string, datos: { estado: string; acciones: string }) {
  return this.http.patch<Reclamo>(`${this.apiUrl}/${id}`, datos);
  }

obtenerReclamosPorId(idUsuario: string): Observable<Reclamo[]> {
  return this.http.get<Reclamo[]>(this.apiUrl).pipe(
    map((reclamos: Reclamo[]) => reclamos.filter(reclamo => reclamo.idUsuario === idUsuario))
  );
}
}