export enum PrioridadeTarefaEnum{
  Baixa,
  Normal,
  Alta,
}

export enum StatusItemTarefa{
  Inalterado,
  Adicionado,
  Removido,
}

export interface ItemTarefaViewModel{
  id?: string;
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean;
}

export interface InserirTarefaViewModel{
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaInseridaViewModel{
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
}

export interface EditarTarefaViewModel{
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaEditadaViewModel{
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
}

export interface TarefaExcluidaViewModel{}

export interface ListarTarefaViewModel{
  id: string;
  titulo: string;
  prioridade: string;
  situacao: string;
}

export interface VisualizarTarefaViewModel{
  id: string;
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  situacao: string;

  dataCriacao: Date;
  dataConclusao?: Date;
  percentualConcluido: number;

  quantidadeItens: number;
  itens: ItemTarefaViewModel[];
}
