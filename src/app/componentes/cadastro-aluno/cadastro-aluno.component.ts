import { Component, EventEmitter, Input, OnInit, Output , inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonInput,IonButton , IonCardTitle } from '@ionic/angular/standalone';
import { AlunoService } from 'src/app/services/aluno.service';



@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss'],
  imports: [IonButton, IonInput, IonCard, IonCardHeader, IonCardContent, FormsModule, IonCardTitle]
})
export class CadastroAlunoComponent  implements OnInit {


  public nome: string ='';

  public service = inject(AlunoService);


  @Input() turma! : string; 


  @Output() cadastrar
  = new EventEmitter<void>();



  constructor() { }

  ngOnInit() {}

  public async salvarBotao() {
    const aluno = {
      turma: this.turma ,
      nome: this.nome }

  await this.service.create(aluno);
  this.nome = ''

    this.cadastrar.emit();
  }

}
