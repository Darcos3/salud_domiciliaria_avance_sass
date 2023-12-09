import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from './services/localstorage.service';
import { ApiService } from './services/api.service';
import { NotiService } from './services/noti.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario: any = [];

  public appPages = [
    { title: 'Historias', url: 'historias-index', icon: 'bookmarks-outline' },
    { title: 'Configuracion', url: '/configuracion-update', icon: 'settings-outline' },
  ];

  constructor(private router: Router,
    private storage: LocalstorageService,
    private api: ApiService,
    private noti: NotiService) {
    this.app();
  }

  app() {
    this.storage.getDataSessionToken().then((tok: any) => {
      let token = tok;
      if (token != null) {
        this.storage.getUserSession().then((user: any) => {
          let us = user;
          this.api.apiObtnerUsuario(token, us).subscribe((data: any) => {
            this.usuario = data.usuario;
            if (this.usuario.estado == 0) {
              this.router.navigate(["/update-password"]);
            } else {
              this.router.navigate(["/historias-index"]);
            }
          })
        })
      }
      else {
        this.router.navigate(["/login"]);
      }
    })
  }

  cerrarSesion() {
    this.storage.getDataSessionToken().then((tok: any) => {
      let token = tok;
      this.api.apiLogout(token).subscribe(data => {
        this.storage.borrarSession();
        this.storage.borrarSessionToken();
        this.storage.borrarUserSession();
        this.router.navigate(["/login"]);
        this.noti.notidanger("Has cerrado sesion!");
      })
    })
  }
}
