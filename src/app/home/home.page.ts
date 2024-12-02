import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  map: mapboxgl.Map | undefined;
  userMarker: mapboxgl.Marker | undefined;
  carMarker: mapboxgl.Marker | undefined;
  addresses: any[] = [];
  destination: any;

  constructor(private platform: Platform) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    const mapboxToken = 'pk.eyJ1IjoiY3Jpc3RtIiwiYSI6ImNtNDI2YnJ6MzA2c3YyaXB0cnp0d2F4cTgifQ.W-CR0JFgvImO5GfvbecLCg'; // Reemplaza con tu token de Mapbox

    if (this.platform.is('hybrid')) {
      Geolocation.getCurrentPosition().then((position) => {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/cristm/cm46i9ggm005601rzf6qn42ea',
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 9,
          accessToken: mapboxToken
        });

        this.userMarker = new mapboxgl.Marker()
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(this.map);
      });
    } else {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/cristm/cm46i9ggm005601rzf6qn42ea',
        center: [-74.5, 40],
        zoom: 14,
        accessToken: mapboxToken
      });
    }
  }

  search(event: any, type: string) {
    const query = event.target.value;

    if (query && this.map) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=your_mapbox_access_token`)
        .then(response => response.json())
        .then(data => {
          this.addresses = data.features;
        });
    }
  }

  onSelect(address: any, type: string) {
    const selectedLngLat = address.geometry.coordinates;

    if (this.map) {
      if (type === 'origin') {
        if (this.userMarker) {
          this.userMarker.setLngLat(selectedLngLat);
        }
      }

      if (type === 'destination') {
        if (this.carMarker) {
          this.carMarker.setLngLat(selectedLngLat);
        } else {
          this.carMarker = new mapboxgl.Marker()
            .setLngLat(selectedLngLat)
            .addTo(this.map);
        }
        this.destination = selectedLngLat;
        this.getRoute();
      }
    }
  }

  getRoute() {
    if (this.map && this.userMarker && this.carMarker) {
      const origin = this.userMarker.getLngLat();
      const destination = this.carMarker.getLngLat();

      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?steps=true&access_token=your_mapbox_access_token`)
        .then(response => response.json())
        .then(data => {
          const route = data.routes[0].geometry.coordinates;
          this.updateRoute(route);
        });
    }
  }

  updateRoute(route: any) {
    if (this.map) {
      if (this.map.getLayer('route')) {
        this.map.removeLayer('route');
        this.map.removeSource('route');
      }

      const routeData: GeoJSON.Feature = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: route
        },
        properties: {}
      };

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: routeData
        },
        paint: {
          'line-color': '#0074cc',
          'line-width': 5
        }
      });
    }
  }

  navigateTo(page: string) {
    console.log('Navegando a', page);
  }

  logout() {
    console.log('Cerrando sesión');
  }
}
