import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {

  cursos: any;
  idUsuario: any;

  constructor(
    private service: CursosService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.idUsuario = params['id']);
   }

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.service.listarNomeCursos().subscribe(
      result => {
        this.cursos = result;
      }
    )
  }

  abrirCurso(id: number, nome: string) {
    nome = nome.toLowerCase().replace(/ /g, "-");

    window.open(`http://localhost:4200/curso/${this.idUsuario}/${nome}/${id}`,'_self');
  }
}
