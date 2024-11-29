import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: mapboxgl.Map;
  constructor(private navCtrl: NavController) {}
  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map', // El ID del contenedor HTML
      style: 'mapbox://styles/mapbox/streets-v11', // El estilo del mapa
      center: [-74.5, 40], // Coordenadas de centro
      zoom: 9
    });



  }

}
