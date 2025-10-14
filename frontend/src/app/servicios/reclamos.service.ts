import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autenticacion } from './autenticacion';
import { map } from 'rxjs/operators';

export interface Reclamo {
  id?: string;
  idUsuario?: number;
  usuario: string;
  fechaHora: string;
  estado: string;
  descripcion: string;
  prioridad: string;
  acciones?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReclamosService {
 
  private apiUrl = 'http://127.0.0.1:8000/api/v1/reclamos/';
  
  private autenticacion: Autenticacion;

  constructor(
    private http: HttpClient,
    autenticacion: Autenticacion,
  ) {
    this.autenticacion = autenticacion;
    const usuarioActual = this.autenticacion.obtenerUsuarioActual();
  }

  // OBTENER todos los reclamos
  obtenerReclamos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(this.apiUrl);
  }

  // CREAR un nuevo reclamo
  crearReclamo(nuevoReclamo: Reclamo): Observable<Reclamo> {
    return this.http.post<Reclamo>(this.apiUrl, nuevoReclamo);
  }

  // MODIFICAR/ACTUALIZAR COMPLETAMENTE un reclamo (Uso principal del USUARIO)
  modificarReclamo(id: string, reclamoActualizado: Reclamo): Observable<Reclamo> {
    return this.http.put<Reclamo>(`${this.apiUrl}${id}/`, reclamoActualizado);
  }

  // ATENDER/ACTUALIZAR PARCIALMENTE un reclamo (Uso principal del GESTOR)
  atenderReclamo(id: string, datos: { estado: string; acciones: string }): Observable<Reclamo> {
    return this.http.patch<Reclamo>(`${this.apiUrl}${id}/`, datos);
  }

  // OBTENER reclamos de un usuario específico
  obtenerReclamosPorId(idUsuario: number): Observable<Reclamo[]> {
    return this.http
      .get<Reclamo[]>(this.apiUrl)
      .pipe(
        map((reclamos: Reclamo[]) => reclamos.filter((reclamo) => reclamo.idUsuario === idUsuario)),
      );
  }
}