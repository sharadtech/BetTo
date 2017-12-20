import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController, Loading, AlertController } from 'ionic-angular';

import { UserProvider } from '../../providers/providers';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  account: { firstname: string, lastname: string, email: string, password: string } = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  private waitingMessage:string;
  private alertSuccessMessages:any;

  constructor(public navCtrl: NavController,
    public user: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private menu: MenuController,
    public loadingCtrl: LoadingController,
    public alerCtrl: AlertController) {
      this.translateService.get(['AJAX_WAITING', 'ALERT_SIGNUP_SUCCESS_TITLE', 'ALERT_SIGNUP_SUCCESS_MSG']).subscribe((values) => {
        this.waitingMessage = values['AJAX_WAITING'];
        this.alertSuccessMessages = new Object();
        this.alertSuccessMessages['ALERT_SIGNUP_SUCCESS_TITLE'] = values['ALERT_SIGNUP_SUCCESS_TITLE'];
        this.alertSuccessMessages['ALERT_SIGNUP_SUCCESS_MSG'] = values['ALERT_SIGNUP_SUCCESS_MSG'];
      });
  }

  doSignup() {
    let loadingObject: Loading = this.loadingCtrl.create({
      content: this.waitingMessage,
      dismissOnPageChange: true
    });
    loadingObject.present();
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      let alert = this.alerCtrl.create({
          title: this.alertSuccessMessages['ALERT_SIGNUP_SUCCESS_TITLE'],
          message: this.alertSuccessMessages['ALERT_SIGNUP_SUCCESS_MSG'],
          buttons: [{
            text:'OK',
            handler: () => {
              this.navCtrl.setRoot('LoginPage', {}, {
                animate: true,
                direction: 'forward'
              });
            }
          }]
        });
      alert.present();

      //this.navCtrl.push(SignupsuccessPage);
    }, (err) => {
      loadingObject.dismiss();
      // Unable to sign up
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

  goBackToLogin(){
    this.navCtrl.setRoot('LoginPage', {}, {
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
