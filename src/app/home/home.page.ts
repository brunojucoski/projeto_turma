import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton ,IonToggle } from '@ionic/angular/standalone';
import { ToggleCustomEvent } from '@ionic/angular';
import { CadastroAlunoComponent } from "../componentes/cadastro-aluno/cadastro-aluno.component";
import { Preferences } from '@capacitor/preferences';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CadastroAlunoComponent , IonToggle],
})


export class HomePage implements OnInit{

  public turma = 'ADS FINAL SUPREMA'

  public modoNoturno: boolean = false ;


  constructor() {}

  ngOnInit(): void {
    this.carregarModoNoturno()
    
  }

public quandoCadastrar(nomeAluno: string) {
  alert(nomeAluno);
}


public async toggleModoNoturno(e: ToggleCustomEvent) {
  this.modoNoturno = e.target.checked;
  document 
    .documentElement
    .classList
    .toggle('ion-palette-dark', this.modoNoturno);

    await Preferences.set({key: "modoNoturno" , value: `${this.modoNoturno}` })
}



public async carregarModoNoturno() {

  const modoNoturnoAtivo = await Preferences .get({key : "modoNoturno"})

  this.modoNoturno = modoNoturnoAtivo.value === 'true'
  
  document 
  .documentElement
  .classList
  .toggle('ion-palette-dark', this.modoNoturno);


}


}
