import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError, Observable, of, EMPTY, throwError } from 'rxjs';
import {
  InserirTarefaViewModel,
  TarefaInseridaViewModel,
  TarefaExcluidaViewModel,
  ListarTarefaViewModel,
  VisualizarTarefaViewModel,
  TarefaEditadaViewModel,
} from '../models/tarefa.models';

@Injectable({ providedIn: 'root' })
export class TarefaService{
  private readonly url: string = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient){}

  public inserir(registro: InserirTarefaViewModel){
    return this.http
    .post<TarefaInseridaViewModel>(this.url, registro)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    registro: TarefaEditadaViewModel
  ): Observable<TarefaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
    .put<TarefaEditadaViewModel>(urlCompleto, registro)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<TarefaExcluidaViewModel>{
    const urlCompleto = `${this.url}/${id}`;

    return this.http
    .delete<TarefaExcluidaViewModel>(urlCompleto)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]>{
    return this.http
    .get(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarTarefaViewModel>{
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
    .get<VisualizarTarefaViewModel>(urlCompleto)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any){
    if(resposta.sucesso) return resposta.dados;

    return of(EMPTY);
  }

  private processarFalha(resposta: any): Observable<never>{
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
