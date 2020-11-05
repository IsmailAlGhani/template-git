import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { GoogleMapsComponent } from 'src/app/components/google-maps/google-maps.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  user: object;
  name: string;
  company: string;
  fingerAvailable: boolean;
  
  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent

  constructor(private fingerAuth: FingerprintAIO) {
    this.user = JSON.parse(localStorage.getItem('User'));
    for (const key in this.user) {
      if (key == 'employee') {
        this.name = this.user[key].name;
        this.company = this.user[key].legalEntityName;
      }
    }
  }

  ngOnInit() {
    this.fingerAuth.isAvailable().then(() => {
      if (localStorage.getItem("fingerRegist") == "true") {
        this.fingerAvailable = false;
      } else {
        this.fingerAvailable = true;
      }
    }).catch(() => {
      this.fingerAvailable = false;
    })
  }

  loadMap(){
    this.mapComponent.loadMap();
  }

  ngOnDestroy() {}

}
