import { NgIf, NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarTarefaViewModel } from '../models/tarefa.models';

@Component({
  selector: 'app-listagem-tarefas',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-tarefas.component.html',
})
export class ListagemTarefasComponent implements OnInit {
  public tarefas: ListarTarefaViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];
  }
}
