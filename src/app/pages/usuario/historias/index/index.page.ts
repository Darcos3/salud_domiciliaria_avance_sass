import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  historias:any = [];
  usuario:any = [];
  url_historias_img:string = '';

  constructor(private api: ApiService, 
    private router: Router, 
    private storage: LocalstorageService, 
    private noti: NotiService,
    private alertController: AlertController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getHistorias();
    this.getUsuario();
    this.url_historias_img = this.api.url_historias_img;
  }

  getHistorias() {
    this.storage.getUserSession().then((us: any) => {
      this.storage.getDataSessionToken().then((tok: any) => {
        let usuario = us;
        let token = tok;

        this.api.apiObtenerHistorias(token, usuario).subscribe( data =>{
          console.log(data)
          if( data.historias == ''){
            this.noti.notidanger("No posees ninguna historia registrada");
          }
          else {
            this.historias = data.historias;
          }
        })
      })
    })
  }

  detalles(id:any){
    this.router.navigate(["/historias-detalles", id]);
  }

  getUsuario(){
    this.storage.getUserSession().then((us:any) =>{
      this.storage.getDataSessionToken().then((tok:any) =>{
        let user = us;
        let token = tok;
        this.api.apiObtnerUsuario(token, user).subscribe((data:any)=>{
          this.usuario = data.usuario;
        })
      })
    })
  }

  async firmar(id:any){
    const alert = await this.alertController.create({
      header: 'Firmar historia',
      subHeader: '¿Estas seguro que quieres firmar esta historia notificacndo que acudiste a la cita?',
      message: 'Una vez firmada le llegará la notificación al profesional que te atendió',
      mode: 'ios',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Aceptar',
        role: 'confirm',
        handler: () => {
          this.storage.getDataSessionToken().then((tok:any)=>{
            let token = tok;
            this.api.apiFirmarHistoria(token, id).subscribe( (data=>{
              this.noti.notisuccess("Has firmado la historia No. " + id);
              this.ionViewWillEnter();
            }))
          })
        },
      }],
    });
    await alert.present();
  }

  actualizar(id:any){
    this.router.navigate(["/historias-update", id]);
  }

}
