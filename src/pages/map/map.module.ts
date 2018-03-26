import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { GoogleMap, GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
  ],
  providers: [
    GoogleMap,
    GoogleMaps
  ]
})
export class MapPageModule {}
