import { NotificacoesService } from './services/notificacoes.service';
import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  
 private Platform = inject(Platform)  
 private notificacaoService = inject(NotificacoesService)
  
  constructor() {
    this.iniciar();
  }

private async iniciar() {
  this.Platform.ready().then(() => {
    this.notificacaoService.iniciar();
  });
}




}
