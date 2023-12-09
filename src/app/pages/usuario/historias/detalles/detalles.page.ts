import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  id:any = 0;
  historia: any = [];
  url_historias_img = this.api.url_historias_img;


  constructor( private api:ApiService, private storage: LocalstorageService, 
    private _route: ActivatedRoute ) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.obtenerHistoria(this.id);
  }

  obtenerHistoria(id:any){
    this.storage.getDataSessionToken().then((tok:any)=>{
      let token = tok;
      this.api.apiObtenerHistoria(token, id).subscribe( (data=>{
        this.historia = data.historia;
        console.log(this.historia)
      }))
    })
  }

}
