import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, LoadingController, Loading, AlertController} from 'ionic-angular';

import { UserProvider } from '../../providers/providers';
import { DashboardPage } from '../pages';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'sharad@sharadtech.com',
    password: 'test'
  };

  private waitingMessage:string;

  constructor(public navCtrl: NavController,
    public user: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private menu: MenuController,
    public loadingCtrl: LoadingController) {
      this.translateService.get('AJAX_WAITING').subscribe((value) => {
        this.waitingMessage = value;
      });
  }

  // Attempt to login in through our User service
  doLogin() {
    let loadingObject: Loading = this.loadingCtrl.create({
      content: this.waitingMessage,
      dismissOnPageChange: true
    });
    loadingObject.present();
    this.user.login(this.account).subscribe((resp) => {
      let serverResponse:any = resp;
      if (serverResponse.data!=null && serverResponse.data.status == "activeNotComplete"){
        this.navCtrl.setRoot('MyprofilePage', {}, {
          animate: true,
          direction: 'forward'
        });
      } else {
        this.navCtrl.setRoot('DashboardPage', {}, {
          animate: true,
          direction: 'forward'
        });
      }

    }, (err) => {
      loadingObject.dismiss();
      // Unable to log in
      let errorMessageKey = 'SERVER_ERROR_'+err.error.status;
      let errorMessage:string = "";
      this.translateService.get(errorMessageKey).subscribe((value) => {errorMessage = value;});

      let toastConfig = {
        message: errorMessage,
        duration: 4000,
        position: 'top'
      };
      let toast = this.toastCtrl.create(toastConfig);
      toast.present();
    });
  }

  signup(){
    this.navCtrl.setRoot('SignupPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ionViewDidEnter() {
    //This is to disable the sideMenu popup on swipe after this page load.
    this.menu.swipeEnable(false);
  }

  // ionViewDidLeave() {
  //   //This is to enable the sideMenu popup on swipe after this page leave
  //   this.menu.swipeEnable(true);
  // }

}
