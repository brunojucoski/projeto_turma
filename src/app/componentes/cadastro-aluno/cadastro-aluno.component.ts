import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonInput,IonButton , IonCardTitle } from '@ionic/angular/standalone';



@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss'],
  imports: [IonButton, IonInput, IonCard, IonCardHeader, IonCardContent, FormsModule, IonCardTitle]
})
export class CadastroAlunoComponent  implements OnInit {


  public nome: string ='';


  @Input() turma! : string; 


  @Output() cadastrar
  = new EventEmitter<string>();



  constructor() { }

  ngOnInit() {}

  public salvarBotao() {
    this.cadastrar.emit(this.nome + ' - ' +this.turma);
  }

}
