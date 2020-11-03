import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/core';

@Component({
  selector: 'app-cap-geoloc',
  templateUrl: './cap-geoloc.component.html',
  styleUrls: ['./cap-geoloc.component.scss'],
})
export class CapGeolocComponent implements OnInit {
  lat: number;
  lng: number;
  position: string;

  constructor() { }

  ngOnInit() {}

  getCurrentPosition() {
    this.position = Geolocation.watchPosition({ timeout: 6000, enableHighAccuracy: true}, ( location, err ) => {
      if (!err) {
        // this.lat = location.coords.latitude;
        // this.lng = location.coords.longitude;
        console.log(location.coords);
        console.log(err);
      } else {
        console.log(location);
        console.log(err);
        Geolocation.clearWatch({ id: this.position });
        this.position = null;
      }
    });
  }
}
