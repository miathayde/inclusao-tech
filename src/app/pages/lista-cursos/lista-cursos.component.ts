import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {

  cursos: any;

  constructor(
    private service: CursosService
  ) { }

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

  abrirCurso(id: number) {
    window.open(`http://localhost:4200/curso/${id}`,'_self');
  }
}
