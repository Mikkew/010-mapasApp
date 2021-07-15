import { AfterViewInit, ElementRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-97.54065161829269, 19.086487277123524];

  constructor() { }
  
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });
    
    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom();
    });
    
    this.mapa.on('zoomend', () => {
      if( this.mapa.getZoom() > 18) {
        this.mapa.zoomTo( 18 );
      }
    });
    
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }
  
  zoomOut(): void {
    this.mapa.zoomOut();
  }
  
  zoomIn(): void {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string): void {
    this.mapa.zoomTo( Number(valor) );
  }

}
