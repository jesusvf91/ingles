import { Component, OnInit } from '@angular/core';
import { DatosInglesService } from './services/datos-ingles/datos-ingles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  datosIngles: any;
  palabraRandom: any;
  verSpanish: any;

  constructor(private readonly datosInglesService: DatosInglesService) {}

  /**
   * Inicialmente se cargan las palabras desde base de datos y se muestra una por pantalla
   */
  async ngOnInit(): Promise<void> {
    this.datosIngles = await this.datosInglesService.obtenerRegistros();

    this.cambiarPalabra();
  }
  
  /**
   * Metodo encargado de poblar la base de datos y refrestar la base cargada en angular
   */
  async cargarDatosIngles() {    
    // Se realiza la carga de datos
    await this.datosInglesService.cargarBaseDatos();

    // Se obtienen nuevamente desde base de datos
    this.datosIngles = await this.datosInglesService.obtenerRegistros();
    this.cambiarPalabra();
  }

  /**
   * Metodo encargado de cambiar la palabra desplegada
   */
  cambiarPalabra() {
    this.palabraRandom = this.datosIngles[Math.floor(Math.random() * this.datosIngles.length)];
    this.verSpanish = false;
  }

  /**
   * Metodo que despliega el significado en español
   */
  mostrarSpanish() {
    this.verSpanish = true;
  }
}
