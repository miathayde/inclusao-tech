import { Component, OnInit } from '@angular/core';
import { CursoAndamento } from '../models/curso-andamento';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-sua-conta',
  templateUrl: './sua-conta.component.html',
  styleUrls: ['./sua-conta.component.scss']
})
export class SuaContaComponent implements OnInit {

  usuario: Usuario = new Usuario();
  nomeCompleto: string;
  cursos: Array<CursoAndamento> = [
    { id: 1, nome: 'Curso 1 - Utilidades Básicas', status: true },
    { id: 1, nome: 'Curso 2 - Barra de Tarefas', status: false },
    { id: 1, nome: 'Curso 3 - Manipulando Arquivos', status: false },
    { id: 1, nome: 'Curso 4 - Aplicações', status: false },
    { id: 1, nome: 'Curso 5 - Utilizando a Internet', status: false }
  ];

  constructor() { }

  ngOnInit(): void {
    this.usuario.nome = "Daphne";
    this.usuario.sobrenome = "de Athayde Garcia";
    this.usuario.cpf="123.456.789-10";
    this.nomeCompleto = this.usuario.nome + " " + this.usuario.sobrenome
  }

}
 