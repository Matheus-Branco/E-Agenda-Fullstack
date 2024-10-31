import { NgIf, NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrioridadeTarefaEnum, VisualizarTarefaViewModel } from '../models/tarefa.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-exclusao-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './exclusao-tarefa.component.html',
})
export class ExclusaoTarefaComponent implements OnInit {
  detalhesTarefa?: VisualizarTarefaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.detalhesTarefa = this.route.snapshot.data['tarefa'];
  }

  public obterTextoPrioridade(prioridade: PrioridadeTarefaEnum): string {
    return PrioridadeTarefaEnum[Number(prioridade)];
  }

  public excluir() {
    this.tarefaService.excluir(this.detalhesTarefa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Tarefa excluída com sucesso!');

    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
