import { NgIf, NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DespesaService } from '../services/despesa.service';
import { FormaPgtoDespesaEnum, VisualizarDespesaViewModel } from '../models/despesa.models';

@Component({
  selector: 'app-exclusao-despesa',
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
  ],
  templateUrl: './exclusao-despesa.component.html',
})
export class ExclusaoDespesaComponent implements OnInit {
  public detalhesDespesa?: VisualizarDespesaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.detalhesDespesa = this.route.snapshot.data['despesa'];
  }

  public obterTextoFormaPagamento(formaPagamento: FormaPgtoDespesaEnum): string {
    const indiceFormaPagamento = Number(formaPagamento);

    return FormaPgtoDespesaEnum[indiceFormaPagamento];
  }

  public excluir() {
    this.despesaService.excluir(this.detalhesDespesa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Despesa excluída com sucesso!');

    this.router.navigate(['/despesas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
