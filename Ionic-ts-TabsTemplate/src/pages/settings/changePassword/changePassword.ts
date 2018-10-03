import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-changePassword',
  templateUrl: 'changePassword.html'
})

export class ChangePasswordPage {
  firstPasswordInput: any;
  secondPasswordInput: any;
  oldPassword: any;

  constructor(private translate: TranslateService, private storage: Storage, private alertCtrl: AlertController, private authService: AuthServiceProvider) {
  }
  wrongInput(errorOutput) {
    let alert = this.alertCtrl.create({
      title: 'ERROR/FEL',
      subTitle: errorOutput,
      buttons: ['Ok']
    });
    alert.present();
  }

  rightInput() {
    let alertObj: any = {};

    this.translate.get(["PASSWORD_CHANGED.title", "PASSWORD_CHANGED.desc"]).subscribe(value => {
      alertObj.title = value["PASSWORD_CHANGED.title"];
      alertObj.desc = value["PASSWORD_CHANGED.desc"];
    })
    let alert = this.alertCtrl.create({
      title: alertObj.title,
      subTitle: alertObj.desc,
      buttons: ['Ok']
    });
    alert.present();
  }
  changePassword() {
    var password_regex = /[a-zA-Z0-9,#!?_\-%\'"]{12,20}/;
    //Check if both password input field are equal
    if (this.firstPasswordInput == this.secondPasswordInput) {
      //Check if password match password policy
      if (password_regex.test(this.firstPasswordInput) && (this.firstPasswordInput).length <= 20 && (this.firstPasswordInput).length >= 12) {
        //New password is authorized, perform request to register to backend
        console.log("lösenord ändras")
        this.storage.get('JWT')
        .then((token) => {
          console.log(this.firstPasswordInput);
            this.authService.changePassword(this.oldPassword, this.firstPasswordInput, token).then((data) => {
              this.rightInput();
            }).catch((err) => {
              if (err > 200 || err < 200) {
                let title = "";
                let dismiss = "";
                this.translate.get('ERRORMSG')
                  .subscribe((result) => {
                    title = result.SWW;
                    dismiss = result.DISMISS;
                  });
                this.wrongInput(err.error.error);
              }
            });
          });
      }
      else {
        //Alert! Password does not match password policy
        let alertObj: any = {};

        this.translate.get(["PASSWORD_NO_POLICYMATCH.title", "PASSWORD_NO_POLICYMATCH.desc"]).subscribe(value => {
          alertObj.title = value["PASSWORD_NO_POLICYMATCH.title"];
          alertObj.desc = value["PASSWORD_NO_POLICYMATCH.desc"];
        })
        let alert = this.alertCtrl.create({
          title: alertObj.title,
          subTitle: alertObj.desc,
          buttons: ['Ok']
        });
        alert.present();
      }
    }
    else {
      //Alert! User has input two different passwords
      let alertObj: any = {};

      this.translate.get(["PASSWORD_NO_MATCH.title", "PASSWORD_NO_MATCH.desc"]).subscribe(value => {
        alertObj.title = value["PASSWORD_NO_MATCH.title"];
        alertObj.desc = value["PASSWORD_NO_MATCH.desc"];
      })
      let alert = this.alertCtrl.create({
        title: alertObj.title,
        subTitle: alertObj.desc,
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  showInfo() {
    let alertObj: any = {};

    this.translate.get(["NEW_PASSWORD_HELP.title", "NEW_PASSWORD_HELP.desc"]).subscribe(value => {
      alertObj.title = value["NEW_PASSWORD_HELP.title"];
      alertObj.desc = value["NEW_PASSWORD_HELP.desc"];
    })
    let alert = this.alertCtrl.create({
      title: alertObj.title,
      subTitle: alertObj.desc,
      buttons: ['Ok']
    });
    alert.present();
  }
}
