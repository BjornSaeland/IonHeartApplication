import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AzureBackendProvider } from '../../providers/servicesTS/azureClient';
import { UserData } from '../../app/shared/models/UserData.model';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  //user: any;
  //user: any[];
  user: UserData;

  text: any;
  Heartrate: any;
  Height: any;
  Weight: any;

  AzureClient: any;
  AzureClientUser: any;

  todoItemTable: any[];
  Itemlist: any[] = [];
  Userlist: any[] = [];

  //constructor(public navCtrl: NavController, public Azure: AzureBackendProvider, public u: UserData)
  constructor(public navCtrl: NavController, public Azure: AzureBackendProvider)
  {
    this.AzureClient = this.Azure.client.getTable('todoitem');
    this.GetItems();
  }

  GetItems() {
    var self = this;
    this.AzureClient.read()
      .then(
        function (data) {
          self.Itemlist = data;
          console.log(data);
        }
    );
    this.text = '';
    this.Heartrate = '';
    this.Height = '';
    this.Weight = '';
  }

  GetUser() {
    this.AzureClientUser = this.Azure.client.getTable('aspnetusers');
    var self = this;
    this.AzureClientUser.read()
      .then(
        function (data) {
          self.Userlist = data;
          console.log(data);
        }
      );
  }

  addItemObject() {
    var self = this;
    this.user.Text = '70';

    this.todoItemTable = this.AzureClient.insert({
      text: this.user.Text,
      complete: false,
    }).then(self.GetItems());

    this.text = '';
  }

  addItem() {
    var self = this;
    //this.user.Text = '70';

    this.todoItemTable = this.AzureClient.insert({
      text: this.text,
      complete: false,
      heartrate: this.Heartrate
      //height: this.Height,
      //weight: this.Weight
    }).then(self.GetItems());

    this.text = '';
  }

  deleteItem(item) {
    var self = this;
    this.todoItemTable = this.AzureClient.del({
        id: item.id
    }).then(self.GetItems());
  }
}
