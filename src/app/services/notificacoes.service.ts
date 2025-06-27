import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {

  constructor() { }

  public iniciar() {
    if (Capacitor.getPlatform() != "web"){
      this.registrar()
      this.registrarEventos
    }
  }


  private async registrarEventos() {
    await PushNotifications.addListener('registration', (token) => {
      console.log( 'consegui registrar: ' , token);
    });

    await PushNotifications.addListener('registrationError', (error) => {
      console.log('erro ao registraire', error);
    });

    await PushNotifications.addListener('pushNotificationReceived', (notificacao) => {
      console.log (' notifications e tals ', notificacao);
   });

    await PushNotifications.addListener('pushNotificationActionPerformed',(notificacao)=> {
      console.log ('clickzera na notification', notificacao);
    });

  }


  private async registrar() {
    const permissao = await PushNotifications.checkPermissions() ;

    if (permissao.receive == "denied") {
      throw new Error ("Permissões de notifications negadas!");
    }

    if (permissao.receive == "granted") {
      console.log("Permissão ja condida");
      return;
    }

    const pedidoPermissao = await PushNotifications.requestPermissions();

    if (pedidoPermissao.receive == "granted") {
      await PushNotifications.register();
    }
  }


}
