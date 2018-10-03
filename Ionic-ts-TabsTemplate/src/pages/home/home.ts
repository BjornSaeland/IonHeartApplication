import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { HelpPage } from '../help/help';
import { SettingsPage } from '../settings/settings';
import { MeasurementPage } from '../measurement/measurement';
import { LoginPage } from '../login/login';
import { HistoryPage } from '../history/history';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: string;
  date = new Date();
  selectedDate: any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController)
  //constructor(public navCtrl: NavController, private authService: AuthServiceProvider, private notificationService: NotificationServiceProvider, private alertCtrl: AlertController)
  {
    this.username = localStorage.getItem('username');
    this.selectedDate = this.date;
    //this.notificationService.setNotifications()
    //  .then((val) => { console.log(val); })
    //  .catch((err) => {
    //    console.log(err);
    //  })
  }

  wrongInput(errorOutput) {
    let alert = this.alertCtrl.create({
      title: 'ERROR/FEL',
      subTitle: errorOutput,
      buttons: ['Ok']
    });
    alert.present();
  }

  //Following functions are used to navigate to other pages
  goToSchedulePage() {
    this.navCtrl.push(SchedulePage);
  }

  goToHelpPage() {
    this.navCtrl.push(HelpPage);
  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  goToMeasurementPage() {
    this.navCtrl.push(MeasurementPage);
  }

  goToHistoryPage() {
    this.navCtrl.push(HistoryPage)
  }

  //logout() {
  //  this.authService.logout();
  //  this.navCtrl.setRoot(LoginPage);
  //}
}
