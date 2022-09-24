import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ocupaciones } from 'src/app/model/ocupaciones.model';

@Injectable({
  providedIn: 'root'
})
export class DatosInglesService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo encargado de obtener datos desde la base de datos.
   * 
   * @returns registros en base de datos
   */
  obtenerRegistros(coleccion: string) {
    return new Promise<any>((resolve)=> {
      this.http.get<Ocupaciones[]>(`./assets/${coleccion}.json`).subscribe((datos) => {
        resolve(datos)
      });
    })
  }
}
