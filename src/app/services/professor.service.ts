import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable , firstValueFrom } from 'rxjs';


export type Professor = {
  id?: number,
  nome: string,
  matricula: string,
  telefone: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

private http = inject(HttpClient);

public findAll(): Observable <Professor[]> {
  return this.http.get <Professor[]>("http://192.168.56.1:3000/professores")
  }

public findAllComPromise(): Promise<Professor[]> {
  return firstValueFrom(this.http.get <Professor[]>("http://192.168.56.1:3000/professores") )
    }

public findById(id: number): Observable <Professor>  {
  return this.http.get <Professor> (`http://192.168.56.1:3000/professores/${id}`)
} 

public create (professor: Professor): Observable <void> {
  return this.http.post<void> ('http://192.168.56.1:3000/professores', professor)
};

public update (professor: Professor,
              id: number) : Observable <void> {

  return this.http.put<void> (`http://192.168.56.1:3000/professores/${id}` , professor);              }

public delete(id: number): Observable<void>{
  return this.http .delete<void>(`http://192.168.56.1:3000/professores/${id}`);
}

public save(professor: Professor): Observable<void> {
  if(professor.id) {
    return this.http.put<void> (`http://192.168.56.1:3000/professores/${professor.id}` , professor);     
  }
  
    return this.http.post<void> ('http://192.168.56.1:3000/professores', professor)
  ;
}
 
}