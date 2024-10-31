import { ResolveFn } from '@angular/router';
import { ListarTarefaViewModel } from '../models/tarefa.models';
import { inject } from '@angular/core';
import { TarefaService } from './tarefa.service';

export const listagemTarefasResolver: ResolveFn<
  ListarTarefaViewModel[]
> = () => {
  return inject(TarefaService).selecionarTodos();
};
