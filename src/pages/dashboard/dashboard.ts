import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { UserProvider } from '../../providers/providers';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    private menu: MenuController,
    public user: UserProvider) {
    translateService.get(['DASHBOARD_TAB1_TITLE', 'DASHBOARD_TAB2_TITLE', 'DASHBOARD_TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['DASHBOARD_TAB1_TITLE'];
      this.tab2Title = values['DASHBOARD_TAB2_TITLE'];
      this.tab3Title = values['DASHBOARD_TAB3_TITLE'];
    });
  }

  doLogout(){
    this.user.logout();
    this.navCtrl.setRoot('LoginPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ionViewDidEnter() {
    //This is to disable the sideMenu popup on swipe after this page load.
    this.menu.swipeEnable(true);
  }

}
