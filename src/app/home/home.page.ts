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
  searchTimeout: any;
  mapboxToken: string = 'pk.eyJ1IjoiY3Jpc3RtIiwiYSI6ImNtNDI2YnJ6MzA2c3YyaXB0cnp0d2F4cTgifQ.W-CR0JFgvImO5GfvbecLCg';
  startTripVisible: boolean = false;
  nombreUsuario: string = ''; // Esta propiedad almacenará el nombre del usuario

  constructor(private platform: Platform, private router: Router) {}

  ngOnInit() {
    // Recuperamos el nombre del usuario desde localStorage
    const usuario = localStorage.getItem('nombre');
    if (usuario) {
      this.nombreUsuario = usuario; // Guardamos el nombre del usuario
    }
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    const initialLng = -70.6483;
    const initialLat = -33.4489;

    if (this.platform.is('hybrid')) {
      Geolocation.getCurrentPosition().then((position) => {
        this.initializeMap(position.coords.longitude, position.coords.latitude);
      }).catch(error => {
        console.error("Error:", error);
        this.initializeMap(initialLng, initialLat);
      });
    } else {
      this.initializeMap(initialLng, initialLat);
    }
  }

  initializeMap(lng: number, lat: number) {
    localStorage.setItem('origin', JSON.stringify({ lng, lat }));

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/cristm/cm46i9ggm005601rzf6qn42ea',
      center: [lng, lat],
      zoom: 14,
      accessToken: this.mapboxToken
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

  goToCurrentLocation() {
    Geolocation.getCurrentPosition().then(position => {
      const { longitude, latitude } = position.coords;
      if (this.map) {
        this.map.flyTo({ center: [longitude, latitude], zoom: 14 });
      }
      if (this.userMarker) {
        this.userMarker.setLngLat([longitude, latitude]);
      }
      if (!this.origin) {
        this.setOrigin(new mapboxgl.LngLat(longitude, latitude)); // Convertimos a LngLat
      } else if (!this.destination) {
        this.setDestination(new mapboxgl.LngLat(longitude, latitude)); // Convertimos a LngLat
      }
    }).catch(error => {
      console.error("Error getting location", error);
    });
  }

  setOrigin(coordinates: mapboxgl.LngLat) {
    localStorage.setItem('origin', JSON.stringify(coordinates));
    this.origin = coordinates;
    if (this.userMarker) {
      this.userMarker.setLngLat(coordinates);
    }
    this.reverseGeocode(coordinates, 'origin');
    this.checkForStartButton();
    this.getRoute();
  }

  setDestination(coordinates: mapboxgl.LngLat) {
    localStorage.setItem('destination', JSON.stringify(coordinates));
    if (this.carMarker) {
      this.carMarker.setLngLat(coordinates);
    } else {
      if (this.map) {
        this.carMarker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat(coordinates)
          .addTo(this.map);
      } else {
        console.error('El mapa no está disponible');
      }
    }
    this.destination = coordinates;
    this.reverseGeocode(coordinates, 'destination');
    this.getRoute();
    this.checkForStartButton();
  }

  reverseGeocode(coordinates: mapboxgl.LngLat, type: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${this.mapboxToken}`)
        .then(response => response.json())
        .then(data => {
          const address = data.features[0]?.place_name;
          if (type === 'origin') {
            const originSearch = document.querySelector('ion-searchbar[placeholder="Ingresa el origen"]') as HTMLIonSearchbarElement;
            if (originSearch) originSearch.value = address || '';
          } else if (type === 'destination') {
            const destinationSearch = document.querySelector('ion-searchbar[placeholder="Ingresa el destino"]') as HTMLIonSearchbarElement;
            if (destinationSearch) destinationSearch.value = address || '';
          }
        })
        .catch(error => console.error(error));
    }, 1000);
  }

  checkForStartButton() {
    if (this.origin && this.destination) {
      this.startTripVisible = true;
    } else {
      this.startTripVisible = false;
    }
  }

  startTrip() {
    if (this.origin && this.destination) {
      console.log('Viajando de', this.origin, 'a', this.destination);
    }
  }

  search(event: any, type: string) {
    const query = event.target.value;
    if (query && query.trim() !== '') {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${this.mapboxToken}`)
        .then(response => response.json())
        .then(data => {
          this.addresses = data.features;
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: any, type: string) {
    if (type === 'origin') {
      this.setOrigin(new mapboxgl.LngLat(address.lng, address.lat)); // Convertimos a LngLat
    } else if (type === 'destination') {
      this.setDestination(new mapboxgl.LngLat(address.lng, address.lat)); // Convertimos a LngLat
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    console.log("Cerrando sesión");
  }

  // Aquí está la implementación del método getRoute
  getRoute() {
    if (this.origin && this.destination && this.map) {
      const origin = this.origin;
      const destination = this.destination;

      // Crear la URL para la API de Mapbox Directions
      const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?steps=true&geometries=geojson&access_token=${this.mapboxToken}`;

      fetch(routeUrl)
        .then(response => response.json())
        .then(data => {
          // Obtener las coordenadas de la ruta
          const route = data.routes[0].geometry.coordinates;

          // Llamar a la función para actualizar la ruta en el mapa
          this.updateRoute(route);
        })
        .catch(error => {
          console.error('Error al obtener la ruta:', error);
        });
    } else {
      console.warn('Origen o destino no definidos');
    }
  }

  updateRoute(route: any) {
    // Actualiza el mapa con la ruta obtenida
    if (this.map) {
      const source = this.map.getSource('route') as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: route
          },
          properties: {}
        });
      } else {
        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: route
            },
            properties: {}
          }
        });

        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          paint: {
            'line-color': '#ff7e5f',
            'line-width': 8
          }
        });
      }
    }
  }
}
