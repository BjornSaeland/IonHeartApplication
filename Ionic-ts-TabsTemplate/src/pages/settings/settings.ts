import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChangeLanguagePage } from '../settings/changeLanguage/changeLanguage'
import { ChangePasswordPage } from '../settings/changePassword/changePassword'
import { Storage } from '@ionic/storage';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    notificationSettings = {
        time: [
            {
                title: 'SETTINGSMENU.NOTIFICATIONMENU.times.onehour',
                value: 1
            },
            {
                title: 'SETTINGSMENU.NOTIFICATIONMENU.times.twohour',
                value: 2
            },
            {
                title: 'SETTINGSMENU.NOTIFICATIONMENU.times.fivehour',
                value: 5
            },
            {
                title: 'SETTINGSMENU.NOTIFICATIONMENU.times.oneday',
                value: 24
            }
        ]
    }

    public notificationsOn: boolean = false;
    constructor(public navCtrl: NavController, private storage: Storage, private notificationService: NotificationServiceProvider) {
        this.storage.get("notificationson").then((value) => {
            this.notificationsOn = value;
        })
            .catch((err) => {
                console.log(err);
            })
    }

    goToLanguageSettings() {
        //GO TO CHANGE LANGUAGE PAGE
        this.navCtrl.push(ChangeLanguagePage);
    }

    goToPasswordSettings() {
        //GO TO CHANGE PASSWORD PAGE
        this.navCtrl.push(ChangePasswordPage);
    }

    reminderTimeSet(value) {
        console.log(value);
        let hourinmilliseconds = 3600000;
        console.log(hourinmilliseconds * value);
        this.storage.set("remindersetting", hourinmilliseconds * value);
    }

    notificationToggle() {
        this.storage.set("notificationson", this.notificationsOn);
        console.log(this.notificationsOn);

        if (this.notificationsOn === true) {
            this.notificationService.setNotifications().then((val) => {
                console.log(val);
            })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this.notificationService.unsubscribe();
            console.log("unsubscribed");
        }
    }
}