import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {
    let self = this;
    this.storage.get('token').then((val) => {
      if(val){
        console.log('token is ' + val);
        self.rootPage = ListPage;
      } else {
        self.rootPage = LoginPage;
      }
    }).catch(error => {
      console.log('token error ' + error);
      self.rootPage = LoginPage;
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Логин', component: LoginPage },
      { title: 'Заявки', component: ListPage },
      { title: 'Карта', component: MapPage },
      { title: 'BluetoothPage', component: BluetoothPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
