import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {
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
  selectedDay: any;

  //Variables for saving patient history
  patientHistoryType = [];
  patientHistoryValue = [];

  constructor(public navCtrl: NavController, private translate: TranslateService, private storage: Storage, private authService: AuthServiceProvider) {
    //constructor(public navCtrl: NavController, private storage: Storage, private authService: AuthServiceProvider) {

    this.fillMonthsArray();
    this.getDaysOfMonth();
  }

  showHistoryOnSelectedDay(day) {
    this.selectedDay = day;
    this.patientHistoryType = new Array();
    this.patientHistoryValue = new Array();

    //CREATE DAY
    this.selectedDate = (this.date.getMonth() + 1) + "/" + day + "/" + this.date.getFullYear();
    this.selectedDate = (this.date.getMonth() + 1) + "/" + day + "/" + this.date.getFullYear();

    var startDate = new Date(this.selectedDate + ', 00:00:00');
    var endDate = new Date(this.selectedDate + ', 23:59:59');

    this.storage.get('JWT')
      .then((token) => {
        //GET ALLOWED TYPES
        var allowedTypes = [];
        this.authService.getTypes(token).then(data => {
          for (let object in data) {
            allowedTypes.push(data[object].name);
          }
          for (let i in allowedTypes) {
            this.authService.getData(allowedTypes[i], token, startDate.getTime(), endDate.getTime())
              .then(data => {
                //this.rightInput();
                for (let object in data) {
                  this.patientHistoryType.push(data[object].name);
                  this.patientHistoryValue.push(data[object].value);
                }
              }).catch((err) => {
                if (err.status > 200 || err.status < 200) {
                  let title = "";
                  let dismiss = "";
                  this.translate.get('ERRORMSG')
                    .subscribe((result) => {
                      title = result.SWW;
                      dismiss = result.DISMISS;
                    });
                }
              });
          }
        }).catch((err) => {
          if (err.status > 200 || err.status < 200) {
            let title = "";
            let dismiss = "";
            this.translate.get('ERRORMSG')
              .subscribe((result) => {
                title = result.SWW;
                dismiss = result.DISMISS;
              });
          }
        });
      });
  }

  fillMonthsArray() {
    this.translate.get(["JAN"]).subscribe(value => {
      this.months[0] = value["JAN"];
    })
    this.translate.get(["FEB"]).subscribe(value => {
      this.months[1] = value["FEB"];
    })
    this.translate.get(["MAR"]).subscribe(value => {
      this.months[2] = value["MAR"];
    })
    this.translate.get(["APR"]).subscribe(value => {
      this.months[3] = value["APR"];
    })
    this.translate.get(["MAY"]).subscribe(value => {
      this.months[4] = value["MAY"];
    })
    this.translate.get(["JUN"]).subscribe(value => {
      this.months[5] = value["JUN"];
    })
    this.translate.get(["JUL"]).subscribe(value => {
      this.months[6] = value["JUL"];
    })
    this.translate.get(["AUG"]).subscribe(value => {
      this.months[7] = value["AUG"];
    })
    this.translate.get(["SEP"]).subscribe(value => {
      this.months[8] = value["SEP"];
    })
    this.translate.get(["OCT"]).subscribe(value => {
      this.months[9] = value["OCT"];
    })
    this.translate.get(["NOV"]).subscribe(value => {
      this.months[10] = value["NOV"];
    })
    this.translate.get(["DEC"]).subscribe(value => {
      this.months[11] = value["DEC"];
    })
  }

  getDaysOfMonth() {
    //Arrays for storing the days of previous, current and next month
    this.daysInCurrentMonth = new Array();
    this.daysInPreviousMonth = new Array();
    this.daysInNextMonth = new Array();

    //Month and year to view when first showing calendar GUI
    this.monthToView = this.months[this.date.getMonth()];
    this.yearToView = this.date.getFullYear();

    //Set current date
    if (this.date.getMonth() == new Date().getMonth() && this.date.getFullYear() == new Date().getFullYear()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = null;
    }

    //Set the first day of current month and show days in previous month in GUI (will be shown as grey)
    var firstDayOfCurrentMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay() + 6;
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (let i = prevNumOfDays - (firstDayOfCurrentMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInPreviousMonth.push(i);
    }

    //Set days in this month which will be shown in calendar GUI
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (let i = 0; i < thisNumOfDays; i++) {
      this.daysInCurrentMonth.push(i + 1);
    }

    //Set last day of current month and show days in next month in GUI (will be shown as grey)
    var lastDayCurrentMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay() - 6;
    //var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
    for (let i = 0; i < (-lastDayCurrentMonth); i++) {
      this.daysInNextMonth.push(i + 1);
    }

    //Set total days which will be seen in calendar for each month
    var totalDays = this.daysInPreviousMonth.length + this.daysInCurrentMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (let i = (7 - lastDayCurrentMonth); i < ((7 - lastDayCurrentMonth) + 7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.selectedDay = null;
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.selectedDay = null;
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }
}
