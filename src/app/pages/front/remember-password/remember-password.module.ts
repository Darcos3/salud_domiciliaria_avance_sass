import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RememberPasswordPageRoutingModule } from './remember-password-routing.module';

import { RememberPasswordPage } from './remember-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RememberPasswordPageRoutingModule
  ],
  declarations: [RememberPasswordPage]
})
export class RememberPasswordPageModule {}
