import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {

  cursos: any;
  idUsuario: any;
  usuario: Usuario = new Usuario();

  constructor(
    private cursosService: CursosService,
    private usuarioservice: UsuariosService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.idUsuario = params['id']);
   }

  ngOnInit(): void {
    this.listarNomeCursos();
  }

  listarNomeCursos() {
    this.cursosService.listarNomeCursos().subscribe(
      result => {
        this.cursos = result;

        this.listarDadosUsuario();
      }
    )
  }

  listarDadosUsuario() {
    this.usuarioservice.obterUsuario(this.idUsuario)
    .subscribe(result => {
      this.usuario = result;

      this.cursos.forEach(e => {
        if(e.id == 1) e.status = this.usuario.aula1;
        else if(e.id == 2) e.status = this.usuario.aula2;
        else if(e.id == 3) e.status = this.usuario.aula3;
        else if(e.id == 4) e.status = this.usuario.aula4;
        else if(e.id == 5) e.status = this.usuario.aula5;
      });
      console.log(this.cursos)
    });
  }

  abrirCurso(id: number, nome: string) {
    nome = nome.toLowerCase().replace(/ /g, "-");

    window.open(`http://localhost:4200/curso/${this.idUsuario}/${nome}/${id}`,'_self');
  }
}
