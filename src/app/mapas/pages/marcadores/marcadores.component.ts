import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MarcadorColor } from 'src/app/interfaces/menu.interface';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-97.54076585048038, 19.086436797011267];

  //Lista de Marcadores
  marcadores: MarcadorColor[] = [];
 
  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    // const markerHTML: HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = "Refaccionaria San Juan";

    // new mapboxgl.Marker({ element: markerHTML})
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );

    this.leerLocalStorage();
  }

  agregarMarcador(): void {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const marcador = new mapboxgl.Marker({
      draggable: true, 
      color 
    })
      .setLngLat( this.center)
      .addTo( this.mapa );

    this.marcadores.push({ color, marcador });

    this.guardarMarcadoresLocalStorage();

    marcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });

  }

  irMarcador( marcador: mapboxgl.Marker ): void {

    this.mapa.flyTo({
      center: marcador.getLngLat(),
    });

  }

  guardarMarcadoresLocalStorage(): void {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( ({ color, marcador }) => {
      
      const { lng, lat } = marcador!.getLngLat();
      
      lngLatArr.push({
        color,
        centro: [ lng, lat ],
      });
    });

    localStorage.setItem( 'marcadores', JSON.stringify(lngLatArr) );
  }

  leerLocalStorage(): void {
    if( !localStorage.getItem( 'marcadores')) return;

    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem( 'marcadores')! );

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      }).setLngLat( m.centro! ).addTo( this.mapa );

      this.marcadores.push({
        marcador: newMarker,
        color: m.color,
      })

      newMarker.on("dragend", () => {
        console.log("drag");
        
        this.guardarMarcadoresLocalStorage();
      });

    })
  }  

  borrarMarcador( i: number ): void {
    this.marcadores[i].marcador?.remove();
    this.marcadores.splice( i, 1 );
    this.guardarMarcadoresLocalStorage();
  }

}

