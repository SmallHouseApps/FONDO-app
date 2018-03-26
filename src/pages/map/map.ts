import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker } from '@ionic-native/google-maps';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('mapHeader') mapHeader;
  map: GoogleMap;
  applicsView: string;
  tap: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.applicsView = "map";
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  segmentChangeEvent(){
    console.log('segmentChangeEvent');
    this.navCtrl.setRoot(ListPage);
  }

  fadeHeader(){
    if(this.tap){
      this.tap = false;
    } else {
      this.mapHeader.nativeElement.classList.add('fade-out');
      this.tap = true;
    }
  }

  loadMap() {
    let self = this;

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(() => {
      self.fadeHeader();
    })

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

}
