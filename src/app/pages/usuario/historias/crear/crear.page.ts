import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NotiService } from 'src/app/services/noti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  pacientes: any = [];
  usuario: any = [];
  currentImage: any = null;

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
  constructor(private api: ApiService, private storage: LocalstorageService, private noti: NotiService, private router: Router) { }

  ngOnInit() {
    this.getPacientes();
    this.getUsuario();
  }

  getUsuario() {
    this.storage.getDataSessionToken().then((tok: any) => {
      let token = tok;
      this.storage.getUserSession().then((us: any) => {
        this.api.apiObtnerUsuario(token, us).subscribe((data: any) => {
          this.usuario = data.rol;
        })
      })
    })
  }

  buscarConsecutivo(id: any) {
    this.storage.getDataSessionToken().then((tok: any) => {
      let token = tok;
      this.api.apiObtnerConsecutivo(token, id).subscribe(data => {
        console.log(data.consecutivo)
        this.form.id_paciente = data.id;
        this.form.consecutivo = data.consecutivo;
      })
    })
  }

  getPacientes() {
    this.storage.getDataSessionToken().then((tok: any) => {
      let token = tok;
      this.api.apiObtnerPacientes(token).subscribe((data: any) => {
        this.pacientes = data.pacientes;
      })
    })
  }

  seleccionarPaciente(id: any) {
    this.buscarConsecutivo(id.value);
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

  crear( fecha:any, hora:any, evolucion:any, inf_relevante:any, concepto:any, antecedentes:any, recomendaciones:any ) {
    this.form.fecha = fecha.value;
    this.form.hora = hora.value;
    this.form.evo_final = evolucion.value;
    this.form.inf_relevante = inf_relevante.value;
    this.form.concepto = concepto.value;
    this.form.antecendes = antecedentes.value;
    this.form.recomedaciones = recomendaciones.value;

    this.storage.getUserSession().then((us:any)=>{
      let id_profesional = us;
      this.storage.getDataSessionToken().then((tok:any)=>{
        let token = tok;
        this.api.apiCrearHistoria(token, id_profesional, this.form.id_paciente, this.form.inf_relevante, this.form.consecutivo, this.form.antecendes, this.form.evo_final, this.form.concepto, this.form.recomedaciones, this.form.fecha, this.form.hora, this.currentImage).subscribe(data=>{
          console.log(data)
          this.noti.notisuccess("Has creado una nueva historia");
          this.router.navigate(["/historias-index"]);
        })
      })
    })
    
  }

  
}
