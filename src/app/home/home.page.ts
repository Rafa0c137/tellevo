import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  map: mapboxgl.Map | undefined;
  userMarker: mapboxgl.Marker | undefined;
  carMarker: mapboxgl.Marker | undefined;
  origin: mapboxgl.LngLat | undefined;
  destination: mapboxgl.LngLat | undefined;
  addresses: any[] = [];
  mapboxToken: string = 'pk.eyJ1IjoicmFmYTBjMTM2IiwiYSI6ImNtM3lzYmNvMjF2MDMyaXEyZ3BwOGRuYzcifQ.7JDWERlfmrFp-EPdRhyUVg'; // Reemplaza con tu token válido
  startTripVisible: boolean = false;

  constructor(private platform: Platform, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    const initialLng = -70.6483; // Coordenadas iniciales
    const initialLat = -33.4489;

    if (this.platform.is('hybrid')) {
      Geolocation.getCurrentPosition().then((position) => {
        this.initializeMap(position.coords.longitude, position.coords.latitude);
      }).catch((error) => {
        console.error('Error obteniendo ubicación:', error);
        this.initializeMap(initialLng, initialLat);
      });
    } else {
      this.initializeMap(initialLng, initialLat);
    }
  }

  initializeMap(lng: number, lat: number) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14,
      accessToken: this.mapboxToken,
    });

    this.userMarker = new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([lng, lat])
      .addTo(this.map);

    this.map.on('click', (e) => {
      const coordinates = e.lngLat;
      if (!this.origin) {
        this.setOrigin(coordinates);
      } else {
        this.setDestination(coordinates);
      }
    });
  }

  setOrigin(coordinates: mapboxgl.LngLat) {
    this.origin = coordinates;
    if (this.userMarker) {
      this.userMarker.setLngLat(coordinates);
    }

    this.checkForStartButton();
    this.getRoute();
  }

  setDestination(coordinates: mapboxgl.LngLat) {
    this.destination = coordinates;
    if (this.carMarker) {
      this.carMarker.setLngLat(coordinates);
    } else if (this.map) {
      this.carMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(coordinates)
        .addTo(this.map);
    }

    this.checkForStartButton();
    this.getRoute();
  }

  getRoute() {
    if (this.origin && this.destination) {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.origin.lng},${this.origin.lat};${this.destination.lng},${this.destination.lat}?geometries=geojson&access_token=${this.mapboxToken}`;
      
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const route = data.routes[0]?.geometry.coordinates;
          if (route) {
            this.updateRoute(route);
          } else {
            console.error('No se encontró una ruta válida.');
          }
        })
        .catch((error) => console.error('Error al obtener la ruta:', error));
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
          coordinates: route,
        },
        properties: {},
      };

      this.map.addSource('route', {
        type: 'geojson',
        data: routeData,
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#0074D9',
          'line-width': 4,
        },
      });
    }
  }

  checkForStartButton() {
    this.startTripVisible = !!(this.origin && this.destination);
  }

  startTrip() {
    if (this.origin && this.destination) {
      alert('¡Viaje iniciado! Ruta trazada.');
    } else {
      alert('Debes seleccionar un origen y un destino para iniciar el viaje.');
    }
  }
  search(event: any, type: string) {
    const query = event.target.value;

    if (!query) {
      this.addresses = [];
      return;
    }

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${this.mapboxToken}&autocomplete=true&limit=5`
    )
      .then((response) => response.json())
      .then((data) => {
        this.addresses = data.features.map((feature: any) => ({
          text: feature.place_name,
          coordinates: feature.geometry.coordinates,
        }));
      });
  }

  onSelect(address: any, type: string) {
    const coordinates = new mapboxgl.LngLat(address.coordinates[0], address.coordinates[1]);

    if (type === 'origin') {
      this.setOrigin(coordinates);
      const originSearch = document.querySelector('ion-searchbar[placeholder="Ingresa la dirección de origen"]') as HTMLIonSearchbarElement;
      if (originSearch) originSearch.value = '';
    } else if (type === 'destination') {
      this.setDestination(coordinates);
      const destinationSearch = document.querySelector('ion-searchbar[placeholder="Ingresa el destino"]') as HTMLIonSearchbarElement;
      if (destinationSearch) destinationSearch.value = '';
    }

    this.addresses = [];
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
