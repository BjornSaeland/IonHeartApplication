import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

 //Variables for saving user info
  loginPass: string
  loginName: string

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private translate: TranslateService, private storage: Storage, private authService: AuthServiceProvider) {
  }

  //Alert if user inputs wrong username/password
  wrongCredentials() {
    let alertobj: any = {};

    this.translate.get(["WRONGCREDENTIALS.title", "WRONGCREDENTIALS.desc"]).subscribe(value => {
      //Alert message can be changed under src/assets/i18n
      alertobj.title = value["WRONGCREDENTIALS.title"];
      alertobj.desc = value["WRONGCREDENTIALS.desc"];
    })

    let alert = this.alertCtrl.create({
      title: alertobj.title,
      subTitle: alertobj.desc,
      buttons: ['Ok']
    });
    alert.present();
  }

  login() {
    //Regex to check username and password
    var username_regex = /[a-öA-Ö]{4}\d{2}/;
    var password_regex = /[a-zA-Z0-9,#!?_\-%\'"]{12,20}/;
    var username_authorized, password_authorized = false;

    if (username_regex.test(this.loginName) && (this.loginName).length <= 6) {
      username_authorized = true;
    }
    if (password_regex.test(this.loginPass) && (this.loginPass).length <= 20 && (this.loginPass).length >= 12) {
      password_authorized = true
    }


    if (username_authorized == true && password_authorized == true) {
      //User is authorized
      this.authService.login(this.loginName, this.loginPass)
        .then(data => {
          //Save uuid and token
          this.storage.set("JWT", data.values[0]);
          this.storage.set("uuid", data.values[1]);
          this.navCtrl.setRoot(HomePage);
        }).catch((err) => {
          if (err > 200 || err < 200) {
            let title = "";
            let dismiss = "";
            this.translate.get('ERRORMSG')
              .subscribe((result) => {
                title = result.SWW;
                dismiss = result.DISMISS;
              });
            this.wrongCredentials();
          }
        });
    } else {
      //User is not authorized
      this.wrongCredentials();
    }
  }
}