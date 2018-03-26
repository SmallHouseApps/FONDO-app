import { Component } from '@angular/core';
import { NavController, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { Pro } from '@ionic/pro';
// import * as $ from 'jquery';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    private storage: Storage,
    private http: HTTP,
    public toastCtrl: ToastController
  ) { }
  

  authRequest(){
    let self = this;
  	let loader = this.loadingCtrl.create({
      content: "Загрузка..."
    });
    loader.present();

    // $.post('http://fondo.ru/api/auth',{ email: 'felkis60@gmail.com', password: '60faabee' },function(data){
    //   console.log(data);
    //   loader.dismiss();
    //   self.navCtrl.setRoot(ListPage);
    //   self.storage.set('token', data.token);
    // });

    this.http.post('http://fondo.ru/api/auth', { email: 'felkis60@gmail.com', password: '60faabee' } , {})
    .then(response => {
      loader.dismiss();
      self.navCtrl.setRoot(ListPage);
      self.storage.set('token', response.data.token);
    })
    .catch(error => {
      self.presentToast(error);
    });
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}
