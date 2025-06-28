import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Professor, ProfessorService } from './../../services/professor.service';
import { Component, EventEmitter, Input, OnInit, Output , inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, ActionSheetButton, ActionSheetController, IonCardContent, IonCardHeader, IonInput, IonButton, IonCardTitle, IonList, IonItem, IonText, IonButtons, IonTitle, IonToggle, IonToolbar, IonHeader, IonContent, IonBackButton, IonModal } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import {  ToggleCustomEvent } from '@ionic/angular';



@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
  imports: [IonModal, IonBackButton, IonContent, IonToggle, RouterModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonText, IonItem, IonList, IonButton, IonInput, IonCard, IonCardHeader, IonCardContent, FormsModule, IonCardTitle, AsyncPipe ]
})

export class ProfessorComponent  implements OnInit {
  presentingElement!: HTMLElement | null;
  
  public modoNoturno: boolean = false ;

  private service = inject(ProfessorService);

  public professor : Professor = {
    nome: '',
    email: '',
    matricula: '',
    telefone: ''
  } 


  public professores$! : Observable<Professor[]>
  public professores: Professor[] = [];
  
  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    this.findAll();
    this.carregarModoNoturno()
    this.presentingElement = document.querySelector('.ion-page');
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


canDismiss = async () => {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'TEM CERTEZA Q QUER FECHAR ESSA BELA PAGINA MEO ? ?',
    buttons: [
      {
        text: 'SIM NÉ ',
        role: 'confirm',
      },
      {
        text: ' AIN NÃO NÉ ',
        role: 'cancel',
      },
    ],
  });

  actionSheet.present();

  const { role } = await actionSheet.onWillDismiss();

  return role === 'confirm';
};


  public findAll() {
    this.professores$ = this.service.findAll();
  }

  public findAllComSubscribe() {
    this.service.findAll().subscribe({
      next: (resposta) => {
          this.professores = resposta;
      },
      error: () => {
        alert("Erro ao buscar professores nesta caralha!!");
      }
    })
  }
/*

  public async salvar() {
    if(this.professor.id)
    this.service.update(this.professor, this.professor.id ).subscribe({
      next: (resposta) => {
      alert("atualizado com sucesso"); 
    },
    error: () => alert("professor não encontrado")
     })

    else {
      this.service.create(this.professor).subscribe({
        next: () => {
          alert("Professor salvo nesta caralha")
          this.findAll()
        },
        error: () => {
          alert("cagou tudo")
        }
      })
    }; 
  

  this.professor = {
    nome: '',
    email: '',
    matricula: '',
    telefone: ''
  }
}


 

 */


    public save(professor: Professor) {
      this.service.save(professor).subscribe({
        next: () => {alert("professor salvo")
        this.findAll();
      },
        error: () => alert("não deu boa")
      
    })

    //confirm.dialog

  }
    public excluir(professor: Professor) {
      if(professor.id) { 
     this.service.delete(professor.id).subscribe ({
      next: () => {
        alert("Professor exclóidu" );
        this.findAll();
      },
      error: () => {
        alert("Nãum da pra ixcluir")
      }
    })
  }
  }


  public editar(professor: Professor) {
    if (professor.id) {
      this.service.findById(professor.id).subscribe({
        next: (resposta) => {
        this.professor = resposta; 
      },
      error: () => alert("professor não encontrado")
       })
    }
  }

  }


