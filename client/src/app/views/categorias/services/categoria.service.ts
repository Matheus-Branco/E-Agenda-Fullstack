import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, catchError, Observable, of, EMPTY, throwError } from "rxjs";
import { InserirCategoriaViewModel, CategoriaInseridaViewModel, EditarCategoriaViewModel, CategoriaEditadaViewModel, CategoriaExcluidaViewModel, ListarCategoriaViewModel, VisualizarCategoriaViewModel } from "../models/categoria.models";

@Injectable({ providedIn: 'root'})
export class CategoriaService {
  private readonly url: string = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  public inserir(registro: InserirCategoriaViewModel) {
    return this.http
      .post<CategoriaInseridaViewModel>(this.url, registro)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    registro: EditarCategoriaViewModel
  ): Observable<CategoriaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<CategoriaEditadaViewModel>(urlCompleto, registro)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<CategoriaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<CategoriaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarCategoriaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarCategoriaViewModel>(urlCompleto)
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
