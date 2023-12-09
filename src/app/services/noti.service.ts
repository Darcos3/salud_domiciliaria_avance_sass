import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotiService {

  constructor(private toast: ToastController) { }

  async notisuccess(msg:any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 4000,
      mode: 'ios',
      color: 'success',
      position: 'top',
      translucent: false,
      animated: true,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async notidanger(msg:any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 4000,
      mode: 'ios',
      color: 'danger',
      position: 'top',
      translucent: false,
      animated: true,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async notiwarning(msg:any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 4000,
      mode: 'ios',
      color: 'warning',
      position: 'top',
      translucent: false,
      animated: true,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async notiinfo(msg:any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 4000,
      mode: 'ios',
      color: 'info',
      position: 'top',
      translucent: false,
      animated: true,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
