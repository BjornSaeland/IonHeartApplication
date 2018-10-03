import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AuthServiceProvider } from '../auth-service/auth-service';
import CronParser from 'cron-parser/lib/parser.js';


@Injectable()
export class NotificationServiceProvider {


    constructor(private storage: Storage, private localNotifications: LocalNotifications, private authService: AuthServiceProvider) {

    }

    setNotifications() {
        return new Promise((resolve, reject) => {
            this.storage.get('JWT')
                .then((token) => {
                    this.authService.getSchedule(token)
                        .then((data) => {
                            this.storage.get("notificationson").then((isOn) => {
                                if (isOn) {
                                    this.storage.get("remindersetting").then((time) => {

                                        if (time === null) {
                                            time = 0;
                                        }

                                        for (let index in data) {
                                            var interval = CronParser.parseExpression(data[index].time);
                                            //Remove all notifications before adding new notifications
                                            this.localNotifications.cancelAll();
                                            //Loop throughout the 5 next scheduleable tasks
                                            for (let i = 0; i < 5; i++) {

                                                let text = interval.next().toString();

                                                //Date which user selects in calendar in ms
                                                var dateInMilliseconds = Date.parse(text);

                                                console.log(dateInMilliseconds + " - " + time);

                                                dateInMilliseconds -= time;

                                                console.log(dateInMilliseconds);

                                                //Set schedule for each found schedule-notification thing
                                                this.localNotifications.schedule({
                                                    id: 1,
                                                    text: data[index].text,
                                                    trigger: { at: new Date(dateInMilliseconds) },
                                                    sound: null
                                                });
                                            }

                                            resolve(true);
                                        }
                                    })
                                        .catch((err) => {
                                            console.log(err);
                                            reject(err);
                                        })
                                } else {
                                    //Notifications is off
                                }
                            })
                                .catch((err) => {
                                    //Notifications not set.
                                    this.storage.set("notificationson", false);
                                    reject(err);
                                })
                        }).catch((err) => {
                            /*if (err.status > 200 || err.status < 200) {
                            let title = "";
                            let dismiss = "";
                            this.translate.get('ERRORMSG')
                                .subscribe((result) => {
                                title = result.SWW;
                                dismiss = result.DISMISS;
                                });
                            }*/
                            reject(err);
                        });
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    unsubscribe() {
        this.localNotifications.cancelAll().then((val) => {
            console.log("notifications cleared!");
        })
            .catch((err) => {
                //Can not clear notifications if Cordova is not available!
                console.log("notifications not cleared!");
                console.log(err);
            })
    }
}