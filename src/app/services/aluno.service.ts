import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export type Aluno = {
  nome: string,
  turma: string
};


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private CHAVE_ALUNOS = 'alunos'; 

  constructor() { }

  public async findAll(): Promise<Aluno[]> {

    const alunosSalvos = await Preferences.get({ key: this.CHAVE_ALUNOS  })


    const alunos = JSON.parse(alunosSalvos.value ?? '[]')


    return alunos;
  }

  public async findByNome(nome: string) {
    const alunos = await this.findAll();
    const aluno = alunos.find(a => a.nome == nome);

    return aluno; 
  }


  public async create(aluno: Aluno) {
    const alunos = await this.findAll();

    alunos.push(aluno); 

    await Preferences.set({
      key: this.CHAVE_ALUNOS,
      value: JSON.stringify(alunos)
    });
  }


  public async delete(aluno: Aluno) {
    const alunos = await this.findAll();

    const alunoIndice = alunos.findIndex(a => a.nome == aluno.nome);

    alunos.splice(alunoIndice,1);

    await Preferences.set({
      key: this.CHAVE_ALUNOS,
      value: JSON.stringify(alunos)
    });
  }


  public async update(alunoSalvo: Aluno , alunoAtualizado: Aluno) {
    const alunos = await this.findAll();

    const alunoIndice = alunos.findIndex(a => a == alunoSalvo) ;

    alunos[alunoIndice] = alunoAtualizado;

    await Preferences.set({
      key: this.CHAVE_ALUNOS,
      value: JSON.stringify(alunos)
    });
  }


}
