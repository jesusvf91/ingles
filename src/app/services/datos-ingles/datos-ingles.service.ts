import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ocupaciones } from 'src/app/model/ocupaciones.model';

@Injectable({
  providedIn: 'root'
})
export class DatosInglesService {

  /**
   * Nombre de la coleccion en firebase
   */
  coleccionFirebase = 'ocupaciones';

  constructor(private db: AngularFirestore,
              private http: HttpClient) { }

  /**
   * Metodo encargado de obtener datos desde la base de datos.
   * 
   * @returns registros en base de datos
   */
  obtenerRegistros() {
    return new Promise<any>((resolve)=> {
      this.db.collection(this.coleccionFirebase).valueChanges({ idField: 'id' }).subscribe(datos => resolve(datos));
    })
  }

  /**
   * Metodo encargado de limpiar y crear nuevamente la base de datos.
   */
  async cargarBaseDatos(): Promise<void> {
    this.http.get<Ocupaciones[]>('./assets/ocupaciones.json').subscribe(async (datos: Ocupaciones[]) => {
      const registros = await this.obtenerRegistros();

      registros.forEach(async(registro: any) => {
        await this.db.doc(`${this.coleccionFirebase}/${registro.id}`).delete();
      });

      datos.forEach(async(element) => {
        await this.db.collection(this.coleccionFirebase).doc(element.Id).set(element);
      });
    });
  }
}
