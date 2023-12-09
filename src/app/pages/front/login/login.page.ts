import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {
    tipo: '',
    num_identificacion: '',
    password: ''
  }

  constructor(private router: Router, private api: ApiService, private noti:NotiService,
    private storage: LocalstorageService) { }

  ngOnInit() {
  }

  registro(){
    this.router.navigate(["/registro"]);
  }

  tipo_usuario(tipo:any){
    this.form.tipo = tipo.value;
  }

  login(num_identificacion:any, password:any){
    this.form.num_identificacion = num_identificacion.value;
    this.form.password = password.value;

    this.api.apiLogin(this.form.tipo, this.form.num_identificacion, this.form.password).subscribe(data =>{
      console.log(data);
      if(data.usuario == null){
        this.noti.notidanger("Los datos que ingresaste son incorrectos");
      }
      else {
        this.storage.setDataSessionToken(data.token);
        this.storage.setUserSession(data.usuario.id);
        this.storage.setDataSession(data.usuario);

        this.router.navigate(["/historias-index"]);
      }
    })
  }

}
