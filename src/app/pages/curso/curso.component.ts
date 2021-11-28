import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  telaVideo: boolean = true;
  idCurso: number;
  usuario: Usuario = new Usuario();
  statusCurso: string;

  curso: any;
  questoesCurso: Array<any> = new Array<any>();
  numSelecionada: number = 0;
  questaoSelecionada: any;
  mudarCor: boolean = false;
  resposta: any = null;
  respostaCorreta: boolean;
  mostrarResposta: boolean = false;
  questoesRespondidas: Array<any> = new Array<any>();
  cursoFinalizado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: CursosService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    const idUsuario = this.route.snapshot.paramMap.get('idUsuario');
    const paramCurso = this.route.snapshot.paramMap.get('idCurso');

    this.buscarNomeCurso(Number(paramCurso));
    this.listarCurso(Number(paramCurso));
    this.buscarUsuario(Number(idUsuario));
    this.escolherQuestao(0);
  }

  listarCurso(id) {
    this.service.listarQuestoesCursos(Number(id)).subscribe(
      result => {
        this.idCurso = result.id;
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

  buscarUsuario(idUsuario: number) {
    this.usuarioService.obterUsuario(idUsuario)
    .subscribe(result => {
      this.usuario = result;
      
      if(this.idCurso == 1) this.statusCurso = this.usuario.aula1;
      else if(this.idCurso == 2) this.statusCurso = this.usuario.aula2;
      else if(this.idCurso == 3) this.statusCurso = this.usuario.aula3;
      else if(this.idCurso == 4) this.statusCurso = this.usuario.aula4;
      else if(this.idCurso == 5) this.statusCurso = this.usuario.aula5;

      if(this.statusCurso == "Em andamento") {
        this.telaVideo = false;
      }
    });
  }

  proximaEtapa() {
    this.alterarDadosCurso();

    this.usuarioService.atualizar(this.usuario)
    .subscribe(() => this.telaVideo = false);
  }

  alterarDadosCurso() {
    var status = 'Em andamento';

    if(this.idCurso == 1) this.usuario.aula1 = status;
    else if(this.idCurso == 2) this.usuario.aula2 = status;
    else if(this.idCurso == 3) this.usuario.aula3 = status;
    else if(this.idCurso == 4) this.usuario.aula4 = status;
    else if(this.idCurso == 5) this.usuario.aula5 = status;
  }

  selecionarResposta(item, selecionada) {
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
    this.resposta = item;
  }

  escolherQuestao(numQuestao) {
    this.mostrarResposta = false;
    this.resposta = null;
    this.numSelecionada = numQuestao;
  }

  enviarResposta(selecionada) {
    this.mostrarResposta = true;
    
    if(this.resposta.resposta == selecionada.resposta) {
      this.respostaCorreta = true;
    } else {
      this.respostaCorreta = false;
    }

    this.questoesRespondidas.push({selecionada: selecionada, numSelecionada: this.numSelecionada});
    
    this.questoesRespondidas.length == 5 ? this.cursoFinalizado = true : this.cursoFinalizado = false;
  }

  proximaQuestao() {
    this.escolherQuestao(this.numSelecionada + 1);
  }

  finalizar() {

  }
}
