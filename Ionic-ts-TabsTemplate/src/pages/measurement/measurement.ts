import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-measurement',
  templateUrl: 'measurement.html'
})

export class MeasurementPage {
  ekgData: any;
  weightData: any;
  bloodPressureData: any;
  pulseData: any;
  fluidData: any;
  breathingData: any;
  commentData: string;
  moodData: any;
  registeredValue: any;

  measurementTypes = [];
  active = "";
  selectedType: any;

  bloodPressureHighValue: any;
  bloodPressureLowValue: any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private translate: TranslateService, private storage: Storage, private authService: AuthServiceProvider) {
    //Set translations to measurement types
    this.translate.get(["EKG"]).subscribe(value => {
      this.ekgData = value["EKG"];
    })

    this.translate.get(["WEIGHT"]).subscribe(value => {
      this.weightData = value["WEIGHT"];
    })

    this.translate.get(["BLOODPRESSURE"]).subscribe(value => {
      this.bloodPressureData = value["BLOODPRESSURE"];
    })

    this.translate.get(["PULSE"]).subscribe(value => {
      this.pulseData = value["PULSE"];
    })

    this.translate.get(["FLUID_LEVELS"]).subscribe(value => {
      this.fluidData = value["FLUID_LEVELS"];
    })

    this.translate.get(["BREATHING_LEVELS"]).subscribe(value => {
      this.breathingData = value["BREATHING_LEVELS"];
    })

    this.translate.get(["COMMENT"]).subscribe(value => {
      this.commentData = value["COMMENT"];
    })

    this.translate.get(["MOOD"]).subscribe(value => {
      this.moodData = value["MOOD"];
    })

    //Collect allowed measurement types
    var allowedTypes = [];
    this.storage.get('JWT')
      .then((token) => {
        //GET ALLOWED TYPES
        this.authService.getTypes(token).then(data => {
          for (let index in data) {
            allowedTypes.push(data[index].name);
          }
          //Match allowed measurement types and add them to the selection
          for (let index in allowedTypes) {
            switch (allowedTypes[index]) {
              case "ekg":
                this.measurementTypes[index] = this.ekgData;
                break;
              case "weight":
                this.measurementTypes[index] = this.weightData;
                break;
              case "fluid":
                this.measurementTypes[index] = this.fluidData;
                break;
              case "blood_pressure":
                this.measurementTypes[index] = this.bloodPressureData;
                break;
              case "pulse":
                this.measurementTypes[index] = this.pulseData;
                break;
              case "breathing":
                this.measurementTypes[index] = this.breathingData;
                break;
              case "comment":
                this.measurementTypes[index] = this.commentData;
                break;
              case "mood":
                this.measurementTypes[index] = this.moodData;
                break;
              default:
                this.measurementTypes[index] = allowedTypes[index];
            }
          }
          this.selectedType = this.measurementTypes[0];
        });
      });
  }

  //Function for showing an alert popup after user have pressed register button
  wrongInput(errorOutput) {
    let alert = this.alertCtrl.create({
      title: 'ERROR/FEL',
      subTitle: errorOutput,
      buttons: ['Ok']
    });
    alert.present();
  }

  rightInput() {
    let alert = this.alertCtrl.create({
      title: 'Mätdata has been registered',
      subTitle: 'Tack för din registrering!',
      buttons: ['Ok']
    });
    alert.present();
  }

  //Function to combine the two values given by user
  bloodPressureFix(bloodPressureHighValue, bloodPressureLowValue) {
    var trueBloodPressure = this.bloodPressureHighValue + "/" + this.bloodPressureLowValue;
    return trueBloodPressure;
  }

  //Function for changing color of smiley-icons when one is selected. 
  setColor(id) {
    var property = document.getElementById(id);

    if (this.active == "") {
      property.style.color = "#68d168"
      this.active = id;
    } else if (this.active == id) {
      this.active = ""
      property.style.color = "#000"
    } else {
      property.style.color = "#68d168"
      var property2 = document.getElementById(this.active);
      property2.style.color = "#000"
      this.active = id;
    }
  }

  setMood(mood) {
    if (this.selectedType == this.moodData) {
      this.registeredValue = mood;
    }
  }

  checkRegex(type, inData, inType = "Text") {
    //Debug
    console.log("Type: " + type + "\ninData: " + inData + "\ninType: " + inType);
    //set minmax values
    var min_value = 0;
    var min2_value = 0;
    var max_value = 10000;
    var max2_value = 10000;
    //Assuming inData does not reside within bounds
    var isMatch = false;
    //Get max-min values
    return new Promise((resolve, reject) => {
      this.storage.get('JWT')
        .then((token) => {
          //GET ALLOWED TYPES
          this.authService.getTypes(token).then(data => {
            for (var index in data) {
              if (data[index].name == type) {
                if (inType == "OverUnder") {
                  min_value = data[index].listConstraint[0];
                  max_value = data[index].listConstraint[1];
                  min2_value = data[index].listConstraint[2];
                  max2_value = data[index].listConstraint[3];
                  console.log("Min: " + min_value + "\nMax: " + max_value + "\nSecond min: " + min2_value + "\nSecond max: " + max2_value);
                }
                else {
                  min_value = data[index].listConstraint[0];
                  max_value = data[index].listConstraint[1];
                  console.log("Min: " + min_value + "\nMax: " + max_value);
                }
                //Types of regexes:
                var digit_regex = /^[0-9/,.':]+$/;
                var text_regex = /^[a-öA-Ö\ '.,!?]+$/;
                if (inType == "Text") {
                  if (text_regex.test(inData)) {
                    console.log("Min: " + min_value + "\nMax: " + max_value);
                    if (min_value < inData.length && max_value > inData.length) {
                      isMatch = true;
                    }
                  }
                } else if (inType == "Numerical") {
                  if (digit_regex.test(inData)) {
                    console.log("Min: " + min_value + "\nMax: " + max_value);
                    if (min_value < Number(inData) && max_value > Number(inData)) {
                      isMatch = true;
                    }
                  }
                } else if (inType == "OverUnder") {
                  if (digit_regex.test(inData)) {
                    var bp_values = inData.split("/");
                    if (min_value < Number(bp_values[0]) && max_value > Number(bp_values[0]) && min2_value < Number(bp_values[1]) && max2_value > Number(bp_values[1])) {
                      isMatch = true;
                    }
                  }
                }
                resolve(isMatch);
              }
            }
          });
        });
    });
  }

  registerData() {
    if (this.selectedType == this.ekgData) {
      this.checkRegex("ekg", this.registeredValue, "Numerical").then((val) => {
        if (val) {
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("ekg", this.registeredValue, token)
                .then(data => {
                  console.log("EKG has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        }
      });
    }
    else if (this.selectedType == this.weightData) {
      this.checkRegex("weight", this.registeredValue, "Numerical").then((val) => {
        if (val) {
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("weight", this.registeredValue, token)
                .then(data => {
                  console.log("Weight has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        } else {
          this.wrongInput("Wrong input!");
        }
      });
    }
    else if (this.selectedType == this.bloodPressureData) {
      this.checkRegex("blood_pressure", this.bloodPressureFix(this.bloodPressureHighValue, this.bloodPressureLowValue), "OverUnder").then((val) => {
        if (val) {
          console.log("Success! Now try to input into database.")
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("blood_pressure", this.bloodPressureFix(this.bloodPressureHighValue, this.bloodPressureLowValue), token)
                .then(data => {
                  console.log("Blood pressure has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        } else {
          this.wrongInput("Wrong input!");
        }
      });
    }
    else if (this.selectedType == this.pulseData) {
      this.checkRegex("pulse", this.registeredValue, "Numerical").then((val) => {
        if (val) {
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("pulse", this.registeredValue, token)
                .then(data => {
                  console.log("Pulse has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        } else {
          this.wrongInput("Wrong input!");
        }
      });
    }
    else if (this.selectedType == this.fluidData) {
      this.checkRegex("fluid", this.registeredValue, "Numerical").then((val) => {
        if (val) {
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("fluid", this.registeredValue, token)
                .then(data => {
                  console.log("Fluids has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        } else {
          this.wrongInput("Wrong input!");
        }
      });
    }
    else if (this.selectedType == this.breathingData) {
      this.checkRegex("breathing", this.registeredValue, "Numerical").then((val) => {
        if (val) {
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("breathing", this.registeredValue, token)
                .then(data => {
                  console.log("Breath has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        } else {
          this.wrongInput("Wrong input!");
        }
      });
    }
    else if (this.selectedType == this.commentData) {
      this.checkRegex("comment", this.registeredValue, "Text").then((val) => {
        if (val) {
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("comment", this.registeredValue, token)
                .then(data => {
                  console.log("Comment has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        } else {
          this.wrongInput("Wrong input!");
        }
      });
    }
    else if (this.selectedType == this.moodData) {
      this.checkRegex("mood", this.registeredValue, "Numerical").then((val) => {
        if (val) {
          this.storage.get('JWT')
            .then((token) => {
              this.authService.register("mood", this.registeredValue, token)
                .then(data => {
                  console.log("Mood has been registered: ", data)
                  this.rightInput();
                }).catch((err) => {
                  if (err.status > 200 || err.status < 200) {
                    let title = "";
                    let dismiss = "";
                    this.wrongInput(err.error.error);
                    this.translate.get('ERRORMSG')
                      .subscribe((result) => {
                        title = result.SWW;
                        dismiss = result.DISMISS;
                      });
                  }
                });
            });
        } else {
          this.wrongInput("Wrong input!");
        }
      });
    }
    else {
      let alertobj: any = {};

      this.translate.get(["NO_VALUE_SELECTED.title", "NO_VALUE_SELECTED.desc"]).subscribe(value => {
        alertobj.title = value["NO_VALUE_SELECTED.title"];
        alertobj.desc = value["NO_VALUE_SELECTED.desc"];
      })

      let alert = this.alertCtrl.create({
        title: alertobj.title,
        subTitle: alertobj.desc,
        buttons: ['Ok']
      });
      alert.present();
    }
    //this.registeredValue = null;
  }
}