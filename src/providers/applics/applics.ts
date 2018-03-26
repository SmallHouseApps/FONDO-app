import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

/*
  Generated class for the ApplicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApplicsProvider {
  applics: Array<{id: number, type: number, account_name: string}>;

  constructor(public http: HTTP, public storage: Storage) {
    console.log('Hello ApplicsProvider Provider');
    this.applics = [];
  }

  getApplicList(page = 1){
    let self = this;
    this.storage.get('token').then((val) => {

      $.ajax({
        url: 'http://fondo.ru/api/v1/application/list?token='+val+'&page='+page,
        type: 'GET',
        crossDomain: true,
        success: function(response) { 
          console.log(response.data); 
          for (let i = 0; i < response.data.length; i++) {
            let applic = response.data[i];
            self.applics.push({
              id: applic.id,
              type: applic.type,
              account_name: applic.order.account.name
            });
          }
        },
        error: function() { console.log('Failed!'); }
    });

      this.http.post('http://fondo.ru/api/v1/application/list?token='+val, {} , {})
      .then(response => {
        console.log(response);
      })
      .catch(error => {

        console.log(error);

      });
    });
  }

  loadAll(){
    return Promise.resolve(this.applics);
  }

}
