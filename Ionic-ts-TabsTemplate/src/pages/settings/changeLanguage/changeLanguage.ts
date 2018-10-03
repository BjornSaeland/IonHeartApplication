import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-changeLanguage',
  templateUrl: 'changeLanguage.html'
})

export class ChangeLanguagePage {
  currentLang;
  
  languages = [
    { name: "sv", title: "Svenska" },
    { name: "en", title: "English" }
  ];
  constructor(private translate: TranslateService, private storage: Storage) {
    this.currentLang = this.translate.currentLang;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.saveData(language);
  }

  saveData(language: string) {
    this.storage.set("lang", language);
    console.log("saved to storage");
  }
}