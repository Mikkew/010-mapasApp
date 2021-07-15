import * as mapboxgl from 'mapbox-gl';

export interface MenuItem {
  ruta: string;
  nombre: string;
}

export interface MarcadorColor {
  color     : string;
  marcador? : mapboxgl.Marker ;
  centro?   : [number, number];
}

export interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}