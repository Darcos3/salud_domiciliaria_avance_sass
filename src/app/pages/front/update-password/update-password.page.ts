import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

  constructor( private router:Router, private noti: NotiService, private api:ApiService, private storage: LocalstorageService ) { }

  ngOnInit(  ) {
  }

  ionViewWillEnter(){

  }

  verificar( pass:any, conpass:any){
    if( pass.value == conpass.value){
      
    }
    else {
      this.noti.notiwarning('Las contraseñas deben ser iguales, por favor intentalo nuevamente');
    }
  }

  actualizar( pass:any ) {
    this.storage.getDataSessionToken().then((tok:any)=>{
      this.storage.getUserSession().then((us:any)=>{
        let token = tok;
        let usuario = us;
        this.api.apiActualizarPassword(token, usuario, pass.value).subscribe((data:any)=>{
          this.noti.notisuccess("Has actualizado tu contraseña exitosamente!");
          this.router.navigate(["/historias-index"])
        })
      })
    })
  }

}
