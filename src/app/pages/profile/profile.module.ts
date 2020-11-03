import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { GoogleMapsComponent } from 'src/app/components/google-maps/google-maps.component';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { CapGeolocComponent } from 'src/app/components/cap-geoloc/cap-geoloc.component';
import { AuthFingerFaceComponent } from 'src/app/components/auth-finger-face/auth-finger-face.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, GoogleMapsComponent, CameraComponent, CapGeolocComponent, AuthFingerFaceComponent]
})
export class ProfilePageModule {}
