import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { SettingsModalPage } from '../pages/settings-modal/settings-modal';
import { MapPage } from '../pages/map/map';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';

import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage,
    SettingsModalPage,
    MapPage,
    BluetoothPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ElasticHeaderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage,
    SettingsModalPage,
    MapPage,
    BluetoothPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    GoogleMaps,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
