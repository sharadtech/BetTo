import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MyprofilePage } from './myprofile';

@NgModule({
  declarations: [
    MyprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyprofilePage),
    TranslateModule.forChild()
  ],
  exports: [
    MyprofilePage
  ]
})
export class MyprofilePageModule {}
