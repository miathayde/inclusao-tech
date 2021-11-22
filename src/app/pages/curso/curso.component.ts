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
  idUsuario: any;
  questoesCurso: Array<any> = new Array<any>();
  numSelecionada: number = 0;
  questaoSelecionada: any;
  mudarCor: boolean = false;
  questoesRespondidas = [];

  constructor(
    private route: ActivatedRoute,
    private service: CursosService
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('idUsuario');
    const paramCurso = this.route.snapshot.paramMap.get('idCurso');

    this.buscarNomeCurso(paramCurso);
    this.listarCurso(paramCurso);
    this.escolherQuestao(0);
  }

  listarCurso(id) {
    this.service.listarQuestoesCursos(Number(id)).subscribe(
      result => {
        let curso = result.questoes;

        if(curso.questao1) {
          this.questoesCurso.push(curso.questao1);
        }
        if(curso.questao2) {
          this.questoesCurso.push(curso.questao2);
        }
        if(curso.questao3) {
          this.questoesCurso.push(curso.questao3);
        }
        if(curso.questao4) {
          this.questoesCurso.push(curso.questao4);
        }
        if(curso.questao5) {
          this.questoesCurso.push(curso.questao5);
        }
        if(curso.questao6) {
          this.questoesCurso.push(curso.questao6);
        }
        if(curso.questao7) {
          this.questoesCurso.push(curso.questao7);
        }
      }
    );
  }

  buscarNomeCurso(id) {
    this.service.buscarNomeCurso(Number(id)).subscribe(
      result => {
        this.curso = result;
      }
    );
  }

  selecionarResposta(item, selecionada) {
    console.log(item)
    if(selecionada.questoes.find(x => x.mudaCor == true)) {
      selecionada.questoes.forEach(i => {
        i.mudaCor = false;
        document.getElementById(i.resposta).style.background = 'transparent';
      });
    }
    item.mudaCor == false ? item.mudaCor = true : item.mudaCor = false;

    item.mudaCor == false ? document.getElementById(item.resposta).style.background = 'transparent' :
      document.getElementById(item.resposta).style.background = '#EDEDED';

    this.questaoSelecionada = selecionada;
  }

  escolherQuestao(numQuestao) {
    this.numSelecionada = numQuestao;
  }

  enviarResposta() {

  }
}
