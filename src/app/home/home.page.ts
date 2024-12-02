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

  constructor(private platform: Platform, private router: Router) {}

  ngOnInit() {}

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
            const originSearch = document.querySelector('ion-searchbar[placeholder="Ingresa la dirección de origen"]') as HTMLIonSearchbarElement;
            if (originSearch) {
              originSearch.value = address;
            }
          }
          if (type === 'destination') {
            const destinationSearch = document.querySelector('ion-searchbar[placeholder="Ingresa el destino"]') as HTMLIonSearchbarElement;
            if (destinationSearch) {
              destinationSearch.value = address;
            }
          }
        });
    }, 500);
  }

  getRoute() {
    if (this.origin && this.destination) {
      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${this.origin.lng},${this.origin.lat};${this.destination.lng},${this.destination.lat}?steps=true&access_token=${this.mapboxToken}`)
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
          'line-color': '#fffff',
          'line-width': 5
        }
      });

      const middlePoint = route[Math.floor(route.length / 2)];
      this.map?.flyTo({
        center: middlePoint,
        zoom: 13,
        speed: 1,
        curve: 1
      });
    }
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
      alert("¡Viaje Iniciado!");
    } else {
      alert("Debes seleccionar un origen y un destino.");
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  search(event: any, type: string) {
    const value = event.target.value;
    if (type === 'origin') {
      
    } else if (type === 'destination') {
      
    }
  }

  onSelect(address: any, type: string) {
    if (type === 'origin') {
      this.setOrigin(address.coordinates);
    } else if (type === 'destination') {
      this.setDestination(address.coordinates);
    }
  }
}
