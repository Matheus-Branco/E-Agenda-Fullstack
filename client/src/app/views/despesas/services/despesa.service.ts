import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError, Observable, of, EMPTY, throwError } from 'rxjs';
import {
  InserirDespesaViewModel,
  DespesaInseridaViewModel,
  EditarDespesaViewModel,
  DespesaEditadaViewModel,
  DespesaExcluidaViewModel,
  ListarDespesaViewModel,
  VisualizarDespesaViewModel,
} from '../models/despesa.models';

@Injectable({ providedIn: 'root' })
export class DespesaService {
  private readonly url: string = `${environment.apiUrl}/despesas`;

  constructor(private http: HttpClient) {}

  public inserir(registro: InserirDespesaViewModel) {
    return this.http
      .post<DespesaInseridaViewModel>(this.url, registro)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    registro: EditarDespesaViewModel
  ): Observable<DespesaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<DespesaEditadaViewModel>(urlCompleto, registro)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<DespesaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<DespesaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarDespesaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarDespesaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    return of(EMPTY);
  }

  private processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
