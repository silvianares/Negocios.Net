import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITipo } from '../interfaces/tipo.interface';
import { INegocio } from '../interfaces/negocio.interface';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  urlAPI = environment.urlAPI;
  private http = inject(HttpClient);

  constructor() {}

  getTipos(): Observable<ITipo[]> {
    return this.http.get<ITipo[]>(`${this.urlAPI}Tipos`);
  }

  getNegociosRadio(lat: number, lng: number, tipo: number, radio: number): Observable<INegocio[]> {
    const urlCompleta = `${this.urlAPI}Negocios/radio?lat=${lat}&lng=${lng}&tipo=${tipo}&radio=${radio}`;
    return this.http.get<INegocio[]>(urlCompleta);
  }
}