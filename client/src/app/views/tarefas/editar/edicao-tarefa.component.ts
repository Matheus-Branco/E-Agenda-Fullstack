import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import {
  EditarTarefaViewModel,
  ItemTarefaViewModel,
  PrioridadeTarefaEnum,
  TarefaEditadaViewModel,
} from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-edicao-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './edicao-tarefa.component.html',
})
export class EdicaoTarefaComponent implements OnInit {
  public form: FormGroup;
  public opcoesPrioridade = Object.values(PrioridadeTarefaEnum).filter(
    (v) => !Number.isFinite(v)
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      prioridade: [0, [Validators.required]],
      itens: this.fb.array([]),
    });
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get prioridade() {
    return this.form.get('prioridade');
  }

  get itens() {
    return this.form.get('itens') as FormArray;
  }

  get itensParaExibicao() {
    return this.itens.controls.filter((c) => c.value.status !== 2);
  }

  ngOnInit(): void {
    const tarefa = this.route.snapshot.data['tarefa'];

    this.form.patchValue(tarefa);

    for (let item of tarefa.itens) {
      const controle = new FormControl({
        id: item.id,
        titulo: item.titulo,
        status: item.status,
        concluido: item.concluido,
      });

      this.itens.push(controle);
    }
  }

  public adicionarItem(tituloItem: string) {
    if (tituloItem.length < 3) {
      this.notificacaoService.aviso(
        'Por favor, insira um título com ao menos 3 caracteres.'
      );
      return;
    }

    const control = new FormControl({
      titulo: tituloItem,
      status: 1,
      concluido: false,
    });

    this.itens.push(control);
  }

  public alterarStatusConcluido(indiceParaConclusao: number) {
    const valorItemSelecionado: ItemTarefaViewModel =
      this.itens.at(indiceParaConclusao).value;

    const itemSelecionadoEstaConcluido = valorItemSelecionado.concluido;

    const objetoEditado = {
      ...valorItemSelecionado,
      concluido: !itemSelecionadoEstaConcluido,
    };

    this.itens.at(indiceParaConclusao).patchValue(objetoEditado);

    if (itemSelecionadoEstaConcluido) {
      this.notificacaoService.aviso(
        'Conclusão do item marcada para ser cancelada.'
      );

      return;
    }

    this.notificacaoService.aviso('Item marcado para conclusão.');
  }

  public removerItem(indiceParaRemover: number) {
    const valorItemSelecionado: ItemTarefaViewModel =
      this.itens.at(indiceParaRemover).value;

    const objetoEditado = {
      ...valorItemSelecionado,
      status: 2,
    };

    this.itens.at(indiceParaRemover).patchValue(objetoEditado);

    this.notificacaoService.aviso('Item marcado para remoção.');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente.'
      );

      return;
    }

    const id = this.route.snapshot.params['id'];
    const editarTarefa: EditarTarefaViewModel = this.form.value;

    this.tarefaService.editar(id, editarTarefa).subscribe({
      next: (despesaInserida) => this.processarSucesso(despesaInserida),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(registro: TarefaEditadaViewModel): void {
    this.notificacaoService.sucesso(
      `Tarefa "${registro.titulo}" editada com sucesso!`
    );

    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
