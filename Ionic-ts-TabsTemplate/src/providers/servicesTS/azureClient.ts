
//import { WindowsAzure } from 'cordova-plugin-ms-azure-mobile-apps';
import { Injectable } from '@angular/core';

declare var WindowsAzure: any;

@Injectable()
export class AzureBackendProvider
{
  //todoItemTable: any[];
  client: any;
  //WindowsAzure: any;

  constructor()
  {
    /*this.client = new WindowsAzure.MobileServiceClient('https://hearthealthcgi.azurewebsites.net');*/
    this.client = new WindowsAzure.MobileServiceClient('http://ionhearthealth.azurewebsites.net/');
    //this.getAll();
  }

  getAll(array: any[]) {
    var self = this;
    this.client.getTable('todoitem').read()
      .then(
      function (data) {
        var number = array.length;
        for (var i = 0; i < number; i++) {
          array.pop();
        }

        data.forEach(value => {
          array.push(value);
        });

        array = data;
        console.log("data");
        console.log(data);
      }
    );
  }

  //getAll() {
  //  var self = this;
  //  this.client.getTable('todoitem').read()
  //    .then(
  //      function (data) {
  //        self.todoItemTable = data;
  //        console.log("data");
  //        console.log(data);
  //      }
  //    );
  //  return self.todoItemTable;
  //}

  deleteItem(item) {
    return this.client.todoItemTable
      .del({
        id: item.id
      });
  }

  addItem(item) {
    return this.client.todoItemTable
      .insert({
      text: item,
      complete: false
    });
  }
}
    
