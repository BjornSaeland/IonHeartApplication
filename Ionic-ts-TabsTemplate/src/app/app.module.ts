import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { Calendar } from '@ionic-native/calendar';
import { ChartsModule } from 'ng2-charts';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { HelpPage } from '../pages/help/help';
import { SettingsPage } from '../pages/settings/settings';
import { ChangeLanguagePage } from '../pages/settings/changeLanguage/changeLanguage';
import { ChangePasswordPage } from '../pages/settings/changePassword/changePassword';
import { MeasurementPage } from '../pages/measurement/measurement';
import { HistoryPage } from '../pages/history/history';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { NotificationServiceProvider } from './../providers/notification-service/notification-service';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { AzureBackendProvider } from '../providers/servicesTS/azureClient';
//import { azureAPI } from '../providers/servicesTS/azureAPI';
import { ChangeNotificationPage } from '../pages/settings/changeNotification/changeNotification';
import { TabsPage } from '../pages/tabs/tabs';





@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginPage,
    SchedulePage,
    HelpPage,
    MeasurementPage,
    HistoryPage,
    SettingsPage,
    ChangeLanguagePage,
    ChangePasswordPage,
    ChangeNotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginPage,
    SchedulePage,
    HelpPage,
    MeasurementPage,
    HistoryPage,
    SettingsPage,
    ChangeLanguagePage,
    ChangePasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    NotificationServiceProvider,
    LocalNotifications,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Calendar,
    AzureBackendProvider,
    //azureAPI,
  ]
})
export class AppModule { }
//Function used to load translations from "/assets/i18n/[lang].json" file.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
