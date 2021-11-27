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
  }

  obterNomesCursos() {
    this.cursosService.listarNomeCursos().subscribe(
      result => {
        let cursos = [];
        cursos = cursos.concat(result);

        cursos.forEach(e => {
          var status;
          if(e.id == 1) status = this.usuario.aula1;
          else if(e.id == 2) status = this.usuario.aula2;
          else if(e.id == 3) status = this.usuario.aula3;
          else if(e.id == 4) status = this.usuario.aula4;
          else if(e.id == 5) status = this.usuario.aula5;
          
          this.cursos.push({ id: e.id, nome: e.nome, status: status });
        });
      
        console.log(this.usuario)
      }
    )
  }

  obterUsuario(id: number) {
    this.usuarioService.obterUsuario(id).subscribe(
      result => {
        this.usuario = result;
        this.nomeCompleto = this.usuario.nome + " " + this.usuario.sobrenome;

        this.usuario.cpf = this.usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

        this.obterNomesCursos();
      }
    );
  }
}
 