import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-help',
    templateUrl: 'help.html',
})

export class HelpPage {

    //Current information that exists in help page. To add/remove content go to srs/assets/i18n to translate and then do as following
    helpinfo = [{
        title: 'HELP.HELPMENU.how',
        description: 'HELP.HELPMENU.how_desc',
    }, {
        title: 'HELP.HELPMENU.contact',
        description: 'HELP.HELPMENU.contact_desc',
    }, {
        title: 'HELP.HELPMENU.about',
        description: "HELP.HELPMENU.about_desc",
    }
    ];

    shownGroup = null;

    useLanguage(language: string) {
        this.translate.use(language);
    }

    constructor(public navCtrl: NavController, private translate: TranslateService) {
    }

    //Function for toggling the list 
    toggleGroup(group) {
        var groups = document.getElementById("list").children;
        var desc = groups[group].getElementsByClassName("descbox").item(0);
        let scrollHeight = desc.scrollHeight;

        if (this.isGroupShown(group)) {
            this.shownGroup = null;
            desc.setAttribute("style", "height: 0px;");
        } else {
            if (this.shownGroup !== null) {
                groups[this.shownGroup].getElementsByClassName("descbox").item(0).setAttribute("style", "height: 0px;");
                desc.setAttribute("style", "height: " + scrollHeight + "px;");
                this.shownGroup = group;
            }

            this.shownGroup = group;
            desc.setAttribute("style", "height: " + scrollHeight + "px;");
        }
    };

    isGroupShown(group) {
        return this.shownGroup === group;
    };
}
