import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SettingsModalPage } from '../../pages/settings-modal/settings-modal';
import { MapPage } from '../../pages/map/map';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
// import * as $ from 'jquery';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('ionHeader') ionHeader;
  @ViewChild('applicsCategoryTabs') applicsCategoryTabs;
  @ViewChild('myContent') myContent;
  @ViewChild('applicCard') applicCard;

  selectedItem: any;
  icons: string[];
  applics: Array<{id: number, type: number, account_name: string}>;
  applicsView: string;
  scrollTrigerPoint: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage,
    private http: HTTP,
    private zone: NgZone
  ) {
    this.applicsView = "list";
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.applics = [];

    this.getApplicList();
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  presentSettingsModal(){
    let modal =  this.modalCtrl.create(SettingsModalPage);  
    modal.present();
  }

  whatApplicTypeIsIt(type) {
    console.log('whatApplicTypeIsIt');
    if (type == 1) return 'applic-delivery';
    else return 'applic-takeout';
  }
  

  scrollEvent(){
    console.log(this.myContent.scrollTop == this.scrollTrigerPoint);
    let headerOffset = this.ionHeader.nativeElement.style.transform.split(',')[1];
    headerOffset = parseInt(headerOffset);
    if(headerOffset < -90){
      this.applicsCategoryTabs.nativeElement.style.display = 'none';
    } else {
      this.applicsCategoryTabs.nativeElement.style.display = 'block';
    }
    if(this.myContent.scrollTop == this.scrollTrigerPoint){
      this.getApplicList(2);
    }
  }

  analyzeContent(){
    this.scrollTrigerPoint = document.getElementById('my-content').getElementsByClassName('scroll-content')[0].scrollHeight - this.myContent.scrollHeight;
  }

  segmentChangeEvent(){
    console.log('segmentChangeEvent');
    this.navCtrl.setRoot(MapPage);
  }

  getApplicList(page = 1){
    let self = this;
    console.log(this.applicCard);
    this.storage.get('token').then((val) => {

    //   $.ajax({
    //     url: 'http://fondo.ru/api/v1/application/list?token='+val+'&page='+page,
    //     type: 'GET',
    //     crossDomain: true,
    //     success: function(response) { 
    //       self.addApplics(response.data);
    //     },
    //     error: function() { console.log('Failed!'); }
    // });

      this.http.post('http://fondo.ru/api/v1/application/list?token='+val, {} , {})
      .then(response => {
        self.addApplics(response.data);
      })
      .catch(error => {

        console.log(error);

      });
    });
  }

  addApplics(data){
    let self = this;
    this.zone.run(() => {
      for (let i = 0; i < data.length; i++) {
        let applic = data[i];
        self.applics.push({
          id: applic.id,
          type: applic.type,
          account_name: applic.order.account.name
        });
      }
    });
  }
}
