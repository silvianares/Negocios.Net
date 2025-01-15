import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITipo } from '../interfaces/tipo.interface';
import { INegocio } from '../interfaces/negocio.interface';
import { ILogin, ILoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  urlAPI = environment.urlAPI;
  private http = inject(HttpClient);

  constructor() {}

  getTipos(): Observable<ITipo[]> {
    return this.http.get<ITipo[]>(`${this.urlAPI}tipos`);
  }

  getNegocios(): Observable<INegocio[]> {
    return this.http.get<INegocio[]>(`${this.urlAPI}negocios`);
  }

  addNegocio(negocio: INegocio): Observable<INegocio> {
    return this.http.post<INegocio>(`${this.urlAPI}negocios`, negocio);
  }

  updateNegocio(negocio: INegocio): Observable<any> {
    return this.http.put<any>(`${this.urlAPI}negocios`, negocio);
  }

  deleteNegocio(id: number): Observable<INegocio> {
    return this.http.delete<INegocio>(`${this.urlAPI}negocios/${id}`);
  }
  
  login(credenciales: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.urlAPI}auth/login`, credenciales);
  }
}
