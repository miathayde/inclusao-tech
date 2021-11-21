import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
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
  cursos: Array<CursoAndamento> = new Array<CursoAndamento>();

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    this.obterNomesCursos();

    this.usuario.nome = "Daphne";
    this.usuario.sobrenome = "de Athayde Garcia";
    this.usuario.cpf="123.456.789-10";
    this.nomeCompleto = this.usuario.nome + " " + this.usuario.sobrenome
  }

  obterNomesCursos() {
    this.service.listarNomeCursos().subscribe(
      result => {
        let cursos = [];
        cursos = cursos.concat(result);

        cursos.forEach(e => {
          this.cursos.push({ id: e.id, nome: e.nome });
        });
      }
    )
  }

}
 