import { Observable } from 'rxjs';
import { Professor, ProfessorService } from './../../services/professor.service';
import { Component, EventEmitter, Input, OnInit, Output , inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonInput,IonButton , IonCardTitle, IonList, IonItem, IonText, IonButtons } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
  imports: [IonButtons, IonText, IonItem, IonList, IonButton, IonInput, IonCard, IonCardHeader, IonCardContent, FormsModule, IonCardTitle, AsyncPipe ]
})

export class ProfessorComponent  implements OnInit {

  private service = inject(ProfessorService);

  public professor : Professor = {
    nome: '',
    email: '',
    matricula: '',
    telefone: ''
  }


  public professores$! : Observable<Professor[]>
  public professores: Professor[] = [];
  
  constructor() { }


  ngOnInit() {
    this.findAll();
    this.findAllComSubscribe();
    
  }

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


