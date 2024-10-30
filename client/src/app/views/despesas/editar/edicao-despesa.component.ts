import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  DespesaEditadaViewModel,
  EditarDespesaViewModel,
  FormaPgtoDespesaEnum,
} from '../models/despesa.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.models';
import { DespesaService } from '../services/despesa.service';

@Component({
  selector: 'app-edicao-despesa',
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
  ],
  templateUrl: './edicao-despesa.component.html',
})
export class EdicaoDespesaComponent implements OnInit {
  public form: FormGroup;
  public categorias: ListarCategoriaViewModel[] = [];

  public opcoesPagamento = Object.values(FormaPgtoDespesaEnum).filter(
    (v) => !Number.isFinite(v)
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      valor: [0.0, [Validators.required, Validators.min(1)]],
      data: [new Date().toISOString().substring(0, 10), [Validators.required]],
      formaPagamento: [0, [Validators.required]],
      categoriasSelecionadas: [[], [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];

    const despesa = this.route.snapshot.data['despesa'];

    this.form.patchValue({
      ...despesa,
      data: new Date(despesa.data).toISOString().substring(0, 10),
      categoriasSelecionadas: despesa.categorias.map((c: ListarCategoriaViewModel) => c.id)
    });
  }

  get descricao() {
    return this.form.get('descricao');
  }

  get valor() {
    return this.form.get('valor');
  }

  get data() {
    return this.form.get('data');
  }

  get formaPagamento() {
    return this.form.get('formaPagamento');
  }

  get categoriasSelecionadas() {
    return this.form.get('categoriasSelecionadas') as FormArray;
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente.'
      );

      return;
    }

    const id = this.route.snapshot.params['id'];

    const editarDespesa: EditarDespesaViewModel = this.form.value;

    this.despesaService.editar(id, editarDespesa).subscribe({
      next: (despesaEditada) => this.processarSucesso(despesaEditada),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(registro: DespesaEditadaViewModel): void {
    this.notificacaoService.sucesso(
      `Despesa "${registro.descricao}" editada com sucesso!`
    );

    this.router.navigate(['/despesas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
