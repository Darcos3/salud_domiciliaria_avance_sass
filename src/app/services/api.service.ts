import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: any = 'http://sda_sas.test/api/';
  url: any = 'http://sda_sas.test/';

  url_historias_img = this.url + 'storage/historias/';

  constructor( private http: HttpClient ) { }

  headers: any;
  headerstoken: any;
  accessToken: any;
  version: any = '1.0.0';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    }),
  };

  /*----------------------------------------/ 
  /* RUTAS POST                             / 
  /*----------------------------------------*/
  apiLogin(tipo:string, usuario: string, password: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json"
    };

    let datos = {
      "tipo": tipo,
      "num_identificacion": usuario,
      "password": password
    }
    return this.http.post(this.api + 'apiLoginPost', datos, { headers });
  }

  apiRegistro(tipo:string, usuario: string, nombre:string, apellidos:string, correo:string, celular:string, ubicacion:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json"
    };

    let datos = {
      "tipo": tipo,
      "num_identificacion": usuario,
      "nombre": nombre,
      "apellidos": apellidos,
      "correo_electronico": correo,
      "num_celular": celular,
      "ubicacion": ubicacion
    }
    return this.http.post(this.api + 'apiRegistrar', datos, { headers });
  }

  apiLogout(token:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
    }
    return this.http.post(this.api + 'apiLogoutPost', datos, { headers });
  }

  apiObtnerUsuario(token:string, usuario:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "usuario": usuario
    }
    return this.http.post(this.api + 'apiObtenerUsuario', datos, { headers });
  }

  apiActualizarUsuario(token:string, id:string, usuario: string, nombre:string, apellidos:string, correo:string, celular:string, ubicacion:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "id": id,
      "usuario": usuario,
      "nombre": nombre,
      "apellidos": apellidos,
      "correo_electronico": correo,
      "num_celular": celular,
      "ubicacion": ubicacion
    }
    return this.http.post(this.api + 'apiUpdate', datos, { headers });
  }

  apiActualizarPassword(token:string, usuario:string, password:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "usuario": usuario,
      "password": password
    }
    return this.http.post(this.api + 'apiGuardarPassword', datos, { headers });
  }

  apiObtnerPacientes(token:any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
    }
    return this.http.post(this.api + 'apiObtenerPacientes', datos, { headers });
  }

  apiObtnerConsecutivo(token:any, num_identificacion:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "num_identificacion": num_identificacion
    }
    return this.http.post(this.api + 'apiObtenerConsecutivo', datos, { headers });
  }

  apiCrearHistoria(token:any, profesional:string, paciente:string, relevante:string, consecutivo: string, antecedentes:string, evolucion:string, concepto:string, recom:string, fecha:string, hora:string, imagen:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "id_profesional": profesional,
      "id_paciente": paciente,
      "inf_relevante": relevante,
      "consecutivo": consecutivo,
      "inf_antecedentes": antecedentes,
      "evolucion_final": evolucion,
      "concepto_profesional": concepto,
      "recomendaciones": recom,
      "fecha": fecha,
      "hora": hora,
      "imagen": imagen
    }
    return this.http.post(this.api + 'apiCrearHistoria', datos, { headers });
  }

  apiActualizarHistoria(token:any, historia:string, relevante:string, antecedentes:string, evolucion:string, concepto:string, recom:string, fecha:string, hora:string, imagen:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "historia": historia,
      "inf_relevante": relevante,
      "inf_antecedentes": antecedentes,
      "evolucion_final": evolucion,
      "concepto_profesional": concepto,
      "recomendaciones": recom,
      "fecha": fecha,
      "hora": hora,
      "imagen": imagen
    }


    return this.http.post(this.api + 'apiUpdateHistoria', datos, { headers });
  }

  apiFirmarHistoria(token:any, historia:string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "historia": historia,
    }
    return this.http.post(this.api + 'apiFirmarHistoria', datos, { headers });
  }

  apiObtenerHistorias( token:string, usuario: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "usuario": usuario,
    }
    return this.http.post(this.api + 'apiObtenerHistorias', datos, { headers });
  }

  apiObtenerHistoria( token:string, historia: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    };

    let datos = {
      "historia": historia,
    }
    return this.http.post(this.api + 'apiObtenerHistoria', datos, { headers });
  }
  

}
