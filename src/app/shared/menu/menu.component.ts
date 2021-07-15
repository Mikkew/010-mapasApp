import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullScreen',
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range',
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores',
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
