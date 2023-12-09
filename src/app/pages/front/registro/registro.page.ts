import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  evento:any = 0;
  datos_usuario:boolean = true;
  datos_perfil:boolean = false;

  constructor() { }

  ngOnInit() {
    this.evento = 0;
  }

  segmentChanged(ev:any){
    this.evento = ev.detail.value;

    if( this.evento == 0){
      this.datos_usuario = true;
      this.datos_perfil = false;
    }
    else {
      this.datos_usuario = false;
      this.datos_perfil = true;
    }
  }

}
