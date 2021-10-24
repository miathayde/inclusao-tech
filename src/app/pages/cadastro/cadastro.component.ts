import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastro: CadastroModel = new CadastroModel();
  repetirSenha: string;
  senhasIguais: string = "vazio";

  constructor() {
    
   }

  ngOnInit(): void {
    this.cadastro.cpf = "";
  }

  verificarSenha() {
    if(this.cadastro.senha == "" && this.repetirSenha == "") {
      this.senhasIguais = "vazio";
    } else if(this.cadastro.senha != this.repetirSenha) {
      this.senhasIguais = "diferentes";
    } else if(this.cadastro.senha == this.repetirSenha) {
      this.senhasIguais = "iguais";
    }
    console.log(this.senhasIguais)
  }

}

export class CadastroModel {
  nome: string;
  sobrenome: string;
  cpf: string;
  senha: string;
}