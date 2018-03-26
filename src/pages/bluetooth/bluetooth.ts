import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the BluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {
  contentText: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private bluetoothSerial: BluetoothSerial
  ) { }

  ionViewDidLoad() {
    let self = this;
    console.log('ionViewDidLoad BluetoothPage');

    let interval = setInterval(function(){
      self.bluetoothSerial.isEnabled().then(val => {
        self.contentText += 'bluetoothSerial isEnabled success ' + val + "_____";
      }).catch(error => {
        self.contentText += 'bluetoothSerial isEnabled error ' + error + "_____";
      });
  
      self.bluetoothSerial.isConnected().then(val => {
        self.contentText += 'bluetoothSerial isConnected success ' + val + "_____";
      }).catch(error => {
        self.contentText += 'bluetoothSerial isConnected error ' + error + "_____";
      });
  
      self.bluetoothSerial.list().then(val => {
        self.contentText += 'bluetoothSerial list success name:' + val[0].name + " address:" + val[0].address + "_____";
        if(val[0].name == "RFT-S08"){
          self.bluetoothSerial.connect(val[0].address).subscribe(val => {
            self.contentText += 'bluetoothSerial connect success ' + val + "_____";
          }, error => {
            self.contentText += 'bluetoothSerial connect error ' + error + "_____";
          });
        }
      }).catch(error => {
        self.contentText += 'bluetoothSerial list error ' + error + "_____";
      });
    }, 1000);
    

    
  }

}
