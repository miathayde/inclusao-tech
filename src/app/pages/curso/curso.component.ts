import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  curso: any;

  constructor(
    private route: ActivatedRoute,
    private service: CursosService
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    this.buscarNomeCurso(paramId);
    this.listarCurso(paramId);
  }

  listarCurso(id) {
    this.service.listarQuestoesCursos(Number(id)).subscribe(
      result => {
        console.log(result)
      }
    )
  }

  buscarNomeCurso(id) {
    this.service.buscarNomeCurso(Number(id)).subscribe(
      result => {
        this.curso = result;
      }
    )
  }
}
