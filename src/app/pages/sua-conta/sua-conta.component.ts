import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { CursoAndamento } from '../models/curso-andamento';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-sua-conta',
  templateUrl: './sua-conta.component.html',
  styleUrls: ['./sua-conta.component.scss']
})
export class SuaContaComponent implements OnInit {

  usuario: Usuario = new Usuario();
  nomeCompleto: string;
  cursos: Array<CursoAndamento> = new Array<CursoAndamento>();

  constructor(
    private cursosService: CursosService,
    private usuarioService: UsuariosService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    this.obterUsuario(Number(paramId));

    this.obterNomesCursos();
  }

  obterNomesCursos() {
    this.cursosService.listarNomeCursos().subscribe(
      result => {
        let cursos = [];
        cursos = cursos.concat(result);

        cursos.forEach(e => {
          this.cursos.push({ id: e.id, nome: e.nome });
        });
      }
    )
  }

  obterUsuario(id: number) {
    this.usuarioService.obterUsuario(id).subscribe(
      result => {
        this.usuario = result;
        this.nomeCompleto = this.usuario.nome + " " + this.usuario.sobrenome;

        this.usuario.cpf = this.usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }
    );
  }
}
 