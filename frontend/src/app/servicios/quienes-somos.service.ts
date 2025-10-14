import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuienesSomosService {

  private profesionalList: { id: number, name: string; perfil: string, photo: string, portfolio: string }[] = [
 ];

  constructor(private http: HttpClient) {  }

  obtenerProfesionales(): Observable<any> {
    return of(this.profesionalList); 
  }

  
}
