import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import CronParser from 'cron-parser/lib/parser.js';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { state } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { Notification } from 'rxjs';

@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html'
})

export class SchedulePage {
    //Variables for calendar
    date = new Date();
    daysInCurrentMonth: any;
    daysInPreviousMonth: any;
    daysInNextMonth: any;
    months = [];
    currentMonth = new Date();
    currentYear = new Date();
    yearToView: any;
    monthToView: any;
    currentDate: any;
    selectedDate: any;

    //Variables for saving schedule info
    scheduleTime = [];
    scheduleText = [];

  constructor(public navCtrl: NavController, public alertctrl: AlertController, private platform: Platform, private localNotifications: LocalNotifications, private storage: Storage, private authService: AuthServiceProvider, private translate: TranslateService) {
    //    this.fillMonthsArray();
    //this.getDaysOfMonth();

    //this.showScheduleForSelectedDate(this.currentDate)

    this.platform.ready().then((readySource) =>
    {
      this.localNotifications.on('click').subscribe(notification => {
        let json = JSON.parse(notification.data);

        let alert = alertctrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      })
    });
  }


  //*************************Notifications*************************
  schemanotification()
  {
    this.localNotifications.schedule(
      {
        id: 1,
        title: 'HALLÅ!!',
        text: 'Dags att gå hem...',
        trigger: { at: new Date(new Date().getTime() + 5 * 1000) },
        //trigger: { at: new this.date(new this.date{}.getTime() + 5 * 1000) },
        //trigger: new this.date(new this.date{}.getTime() + 5 * 1000),
        data: { myData: 'Psst! detta är en hemlis'}

      });
  }
  //*************************/Notifications*************************

    //wrongInput(errorOutput) {
    //    let alert = this.alertctrl.create({
    //        title: 'ERROR/FEL',
    //        subTitle: errorOutput,
    //        buttons: ['Ok']
    //    });
    //    alert.present();
    //}

    //showScheduleForSelectedDate(day) {
    //    //Used for GUI
    //    this.selectedDate = day;

    //    //Arrays for storing schedule info
    //    this.scheduleText = new Array();
    //    this.scheduleTime = new Array();

    //    this.storage.get('JWT')
    //        .then((token) => {
    //            this.authService.getSchedule(token)
    //                .then((data) => {
    //                    for (let index in data) {
    //                        var interval = CronParser.parseExpression(data[index].time);
    //                        for (let i = 0; i < 5; i++) {
    //                            //Variable representing the date where a schedule exists at 00.00.00
    //                            var scheduleDay = new Date((this.date.getMonth() + 1) + "/" + day + "/" + this.date.getFullYear() + ", 00:00:00");
    //                            var scheduleDayInMilliseconds = scheduleDay.getTime();

    //                            //What is this?
    //                            let text = interval.next().toString();

    //                            //Date which user selects in calendar in ms
    //                            var dateInMilliseconds = Date.parse(text);

    //                            //Check if scheduled time is between function argument days time 00.00.00 and 23.59.59, to show the selected days scheduled tasks.
    //                            if (dateInMilliseconds > scheduleDayInMilliseconds && dateInMilliseconds < (scheduleDayInMilliseconds + 86400000)) {
    //                                console.log(
    //                                    '"' +
    //                                    data[index].text +
    //                                    '" taken by ' +
    //                                    text
    //                                );
    //                                //Save info in arrays. Substring used to get the time out of the string 
    //                                //These arrays are used to display schedule on the webpage.
    //                                this.scheduleTime.push(text.toString().substring(16, 21));
    //                                this.scheduleText.push(data[index].text);
    //                            }
    //                        }
    //                    }
    //                }).catch((err) => {
    //                    if (err.status > 200 || err.status < 200) {
    //                        let title = "";
    //                        let dismiss = "";
    //                        this.wrongInput(err.error.error);
    //                        this.translate.get('ERRORMSG')
    //                            .subscribe((result) => {
    //                                title = result.SWW;
    //                                dismiss = result.DISMISS;
    //                            });
    //                    }
    //                });
    //        }).catch((err) => {
    //            this.wrongInput(err.error.error);
    //        });
    //}

    //fillMonthsArray() {
    //    this.translate.get(["JAN"]).subscribe(value => {
    //        this.months[0] = value["JAN"];
    //    })
    //    this.translate.get(["FEB"]).subscribe(value => {
    //        this.months[1] = value["FEB"];
    //    })
    //    this.translate.get(["MAR"]).subscribe(value => {
    //        this.months[2] = value["MAR"];
    //    })
    //    this.translate.get(["APR"]).subscribe(value => {
    //        this.months[3] = value["APR"];
    //    })
    //    this.translate.get(["MAY"]).subscribe(value => {
    //        this.months[4] = value["MAY"];
    //    })
    //    this.translate.get(["JUN"]).subscribe(value => {
    //        this.months[5] = value["JUN"];
    //    })
    //    this.translate.get(["JUL"]).subscribe(value => {
    //        this.months[6] = value["JUL"];
    //    })
    //    this.translate.get(["AUG"]).subscribe(value => {
    //        this.months[7] = value["AUG"];
    //    })
    //    this.translate.get(["SEP"]).subscribe(value => {
    //        this.months[8] = value["SEP"];
    //    })
    //    this.translate.get(["OCT"]).subscribe(value => {
    //        this.months[9] = value["OCT"];
    //    })
    //    this.translate.get(["NOV"]).subscribe(value => {
    //        this.months[10] = value["NOV"];
    //    })
    //    this.translate.get(["DEC"]).subscribe(value => {
    //        this.months[11] = value["DEC"];
    //    })
    //}

    //getDaysOfMonth() {
    //    //Arrays for storing the days of previous, current and next month
    //    this.daysInCurrentMonth = new Array();
    //    this.daysInPreviousMonth = new Array();
    //    this.daysInNextMonth = new Array();

    //    //Month and year to view when first showing calendar GUI
    //    this.monthToView = this.months[this.date.getMonth()];
    //    this.yearToView = this.date.getFullYear();

    //    //Set current date
    //    if (this.date.getMonth() == new Date().getMonth() && this.date.getFullYear() == new Date().getFullYear()) {
    //        this.currentDate = new Date().getDate();
    //    } else {
    //        this.currentDate = null;
    //    }

    //    //Set the first day of current month and show days in previous month in GUI (will be shown as grey)
    //    var firstDayOfCurrentMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay() + 6;
    //    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    //    for (let i = prevNumOfDays - (firstDayOfCurrentMonth - 1); i <= prevNumOfDays; i++) {
    //        this.daysInPreviousMonth.push(i);
    //    }

    //    //Set days in this month which will be shown in calendar GUI
    //    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    //    for (let i = 0; i < thisNumOfDays; i++) {
    //        this.daysInCurrentMonth.push(i + 1);
    //    }

    //    //Set last day of current month and show days in next month in GUI (will be shown as grey)
    //    var lastDayOfCurrentMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay() - 6;
    //    for (let i = 0; i < (-lastDayOfCurrentMonth); i++) {
    //        this.daysInNextMonth.push(i + 1);
    //    }

    //    //Set total days which will be seen in calendar for each month
    //    var totalDays = this.daysInPreviousMonth.length + this.daysInCurrentMonth.length + this.daysInNextMonth.length;
    //    if (totalDays < 36) {
    //        for (let i = (7 - lastDayOfCurrentMonth); i < ((7 - lastDayOfCurrentMonth) + 7); i++) {
    //            this.daysInNextMonth.push(i);
    //        }
    //    }
    //}

    //goToPreviousMonth() {
    //    this.selectedDate = null;
    //    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    //    this.getDaysOfMonth();
    //}

    //goToNextMonth() {
    //    this.selectedDate = null;
    //    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    //    this.getDaysOfMonth();
    //}
}
