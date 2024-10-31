import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import {
  InserirTarefaViewModel,
  PrioridadeTarefaEnum,
  TarefaInseridaViewModel,
} from '../models/tarefa.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-cadastro-tarefa',
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
  templateUrl: './cadastro-tarefa.component.html',
})
export class CadastroTarefaComponent {
  public form: FormGroup;
  public opcoesPrioridade = Object.values(PrioridadeTarefaEnum).filter(
    (v) => !Number.isFinite(v)
  );

  constructor(
    private fb: FormBuilder,
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

  public removerItem(indiceParaRemover: number) {
    this.itens.removeAt(indiceParaRemover);

    this.notificacaoService.aviso('Item removido.');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente.'
      );

      return;
    }

    const inserirTarefa: InserirTarefaViewModel = this.form.value;

    this.tarefaService.inserir(inserirTarefa).subscribe({
      next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(registro: TarefaInseridaViewModel): void {
    this.notificacaoService.sucesso(
      `Tarefa "${registro.titulo}" cadastrada com sucesso!`
    );

    this.router.navigate(['/tarefas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
