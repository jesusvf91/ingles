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
  tipoPalabra: string = 'ocupaciones';
  listaTipos = [
    {
      'tipo': 'ocupaciones'
    },
    {
      'tipo': 'vocabulario'
    },
    {
      'tipo': 'lugares'
    }
  ]

  constructor(private readonly datosInglesService: DatosInglesService) {}

  /**
   * Inicialmente se cargan las palabras desde base de datos y se muestra una por pantalla
   */
  async ngOnInit(): Promise<void> {
    this.datosIngles = await this.datosInglesService.obtenerRegistros(this.listaTipos[0].tipo);

    this.cambiarPalabra();
  }

  /**
   * Metodo encargado de cambiar la palabra desplegada
   */
  async cambiarPalabra() {
    this.datosIngles = await this.datosInglesService.obtenerRegistros(this.tipoPalabra);

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
