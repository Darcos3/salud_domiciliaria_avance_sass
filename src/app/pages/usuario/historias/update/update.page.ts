import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  pacientes: any = [];
  usuario: any = [];
  currentImage: any = null;
  id:any;
  historia:any;
  url_historias_img = this.api.url_historias_img;

  form = {
    id_paciente: '',
    id_profesional: '',
    consecutivo: '',
    fecha: '',
    hora: '',
    evo_final: '',
    inf_relevante: '',
    concepto:'',
    antecendes: '',
    recomedaciones: '',
    imagen: ''
  }

  constructor( private api: ApiService, private storage: LocalstorageService, private router: Router,
    private _route: ActivatedRoute, private noti: NotiService ) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.obtenerHistoria(this.id);
  }

  async cargarImagen() {
    const image = await Camera.getPhoto({
      promptLabelHeader: 'Agregar foto',
      promptLabelPhoto: 'Seleccionar desde la galería',
      promptLabelPicture: 'Tomar foto con la cámara',
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.currentImage = image.dataUrl;
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

  actualizar( fecha:any, hora:any, evolucion:any, inf_relevante:any, concepto:any, antecedentes:any, recomendaciones:any ) {
    
    this.form.fecha = fecha.value;
    this.form.hora = hora.value;
    this.form.evo_final = evolucion.value;
    this.form.inf_relevante = inf_relevante.value;
    this.form.concepto = concepto.value;
    this.form.antecendes = antecedentes.value;
    this.form.recomedaciones = recomendaciones.value;

    this.storage.getDataSessionToken().then((tok:any)=>{
      let token = tok;
      this.api.apiActualizarHistoria(token, this.id, this.form.inf_relevante, this.form.antecendes, this.form.evo_final, this.form.concepto, this.form.recomedaciones, this.form.fecha, this.form.hora, this.currentImage).subscribe(data=>{
        console.log(data)
        this.noti.notisuccess("Has actualizado la historia No. "+this.id);
        this.router.navigate(["/historias-index"]);
      })
    })
    
  }

}
