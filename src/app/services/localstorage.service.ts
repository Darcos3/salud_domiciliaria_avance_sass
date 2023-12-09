import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
    providedIn: 'root'
})
export class LocalstorageService {

    key = 'gp_session';
    key2 = 'gp_tokenId';
    key3 = 'gp_userSession';

    constructor(private storage: Storage) {
        this.storage.create();
    }

    // Crear id de sesion
    async setUserSession(value: any) {
        const res = await this.storage.set(this.key3, value);
    }

    // Obtener datos de storage de sesion id
    getUserSession() {
        return this.storage.get(this.key3);
        console.log(this.key)
    }

    // Borrar sesion Id del usuario
    async borrarUserSession() {
        await this.storage.remove(this.key3);
    }

    // Crear id de sesion
    async setDataSession(value: any) {
        const res = await this.storage.set(this.key, value);
        console.log(res);
    }

    // Obtener datos de storage de sesion id
    getDataSession() {
        return this.storage.get(this.key);
        console.log(this.key)
    }

    // Borrar sesion Id del usuario
    async borrarSession() {
        await this.storage.remove(this.key);
        await this.storage.remove(this.key3);
    }

    async setDataSessionToken(value: any) {
        const res = await this.storage.set(this.key2, value);
        console.log(res);
    }

    // Obtener datos de storage de sesion id
    getDataSessionToken() {
        return this.storage.get(this.key2);
    }

    // Borrar sesion Id del usuario
    async borrarSessionToken() {
        await this.storage.remove(this.key2);
    }


}
