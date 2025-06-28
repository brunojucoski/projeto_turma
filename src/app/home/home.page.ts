import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton ,IonToggle, IonList, IonListHeader, IonLabel, IonButtons , IonItem } from '@ionic/angular/standalone';
import {  ToggleCustomEvent } from '@ionic/angular';
import { CadastroAlunoComponent } from "../componentes/cadastro-aluno/cadastro-aluno.component";
import { Preferences } from '@capacitor/preferences';
import { Aluno, AlunoService } from 'src/app/services/aluno.service';
import { ProfessorComponent } from "../componentes/professor/professor.component";
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CadastroAlunoComponent, IonToggle, IonList, IonListHeader, IonLabel, IonButtons, IonItem, IonButton, ProfessorComponent , RouterModule],
})


export class HomePage implements OnInit{
  

  public turma = 'ADS FINAL SUPREMA'

  public modoNoturno: boolean = false ;

  private service = inject(AlunoService);

  public alunos: Aluno[] = []; 

  

  constructor() {}

  ngOnInit(): void {
    this.carregarModoNoturno()
    this.carregarAlunos()
  }



  public async carregarAlunos(){
    this.alunos = await this.service.findAll();
  }


public async quandoCadastrar(aluno: Aluno) {
  await this.service.create(aluno);
  this.carregarAlunos(); 
}

public async excluir(aluno: Aluno) {
  await this.service.delete(aluno);
  await this.carregarAlunos();
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
