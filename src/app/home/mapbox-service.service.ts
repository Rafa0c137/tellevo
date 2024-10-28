import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface MapboxOutput {
  attribution: string;
  features: feature[];
  query: any[]; // Especifica `any[]` si no tienes un tipo definido para los elementos de `query`
}

export interface feature {
  place_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapboxServiceService {

  constructor(private http: HttpClient) { }

  search_word(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get<MapboxOutput>(url + query + '.json?types=address&access_token=' + environment.mapbox.accesstoken)
      .pipe(map((res) => res.features));
  }
}
