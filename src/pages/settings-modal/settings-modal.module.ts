import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsModalPage } from './settings-modal';

@NgModule({
  declarations: [
    SettingsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsModalPage),
  ],
})
export class SettingsModalPageModule {}
