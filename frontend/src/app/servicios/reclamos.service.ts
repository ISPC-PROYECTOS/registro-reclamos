import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reclamo {
  id?: string; 
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

  constructor(private http: HttpClient) { }
 
  obtenerReclamos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(this.apiUrl);
  }

  crearReclamo(nuevoReclamo: Reclamo): Observable<Reclamo> {
    return this.http.post<Reclamo>(this.apiUrl, nuevoReclamo);
  }

  atenderReclamo(id: string, datos: { estado: string; acciones: string }) {
  return this.http.patch<Reclamo>(`${this.apiUrl}/${id}`, datos);
  }
}