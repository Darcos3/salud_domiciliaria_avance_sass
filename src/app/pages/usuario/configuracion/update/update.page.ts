import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  datos_usuario: boolean = true;
  datos_perfil: boolean = false;
  usuarios: any = [];
  rol: any = [];
  evento: any = 1;

  constructor(private api: ApiService, private storage: LocalstorageService, private noti: NotiService) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.getUsuario();
  }

  getUsuario() {
    this.storage.getDataSessionToken().then((tok: any) => {
      this.storage.getUserSession().then((us: any) => {
        let token = tok;
        let user = us;
        this.api.apiObtnerUsuario(token, user).subscribe((data: any) => {
          this.usuarios = data.usuario;
          this.rol = data.rol;
          console.log(this.usuarios)
          console.log(this.rol)
        })
      })
    })
  }

  actualizar(usuario: any, correo_electronico: any, nombre: any, apellidos: any, num_celular: any, ubicacion: any) {
    console.log('Actualizar')
    this.storage.getDataSessionToken().then((tok: any) => {
      this.storage.getUserSession().then((us: any) => {
        let token = tok;
        let user = us;
        this.api.apiActualizarUsuario(token, user, usuario.value, nombre.value, apellidos.value, correo_electronico.value, num_celular.value, ubicacion.value).subscribe((data:any)=>{
          this.noti.notisuccess("Has actualizado tus datos de perfil");
          this.ionViewWillEnter();
        });
      })
    })

  }

}
