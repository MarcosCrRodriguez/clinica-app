import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadesService {
  private especialidadesUrl = 'assets/especialidades.json'; // Ruta al archivo JSON

  constructor(private http: HttpClient) {}

  getEspecialidades(): Observable<any> {
    return this.http.get(this.especialidadesUrl);
  }
}
