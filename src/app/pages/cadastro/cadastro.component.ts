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
  aviso: string = "";
  mostrarAviso: boolean = false;
  alertCPF: boolean = false;

  constructor() {
    
   }

  ngOnInit(): void {
    this.cadastro.cpf = "";
    this.cadastro.nome = "";
    this.cadastro.sobrenome = "";
    this.cadastro.senha = "";
    this.repetirSenha = "";
  }

  verificarSenha() {
    if(this.cadastro.senha == "" && this.repetirSenha == "") {
      this.senhasIguais = "vazio";
    } else if(this.cadastro.senha != this.repetirSenha) {
      this.senhasIguais = "diferentes";
    } else if(this.cadastro.senha == this.repetirSenha) {
      this.senhasIguais = "iguais";
    }
  }

  validarCPF(cpf: string) {
    cpf = cpf.replace(/[^0-9]/g, "");
    
    if(Number(cpf.charAt(0)) == Number(cpf.charAt(1)) && Number(cpf.charAt(1)) == Number(cpf.charAt(2)) &&
      Number(cpf.charAt(2)) == Number(cpf.charAt(3)) && Number(cpf.charAt(3)) == Number(cpf.charAt(4)) &&
      Number(cpf.charAt(4)) == Number(cpf.charAt(5)) && Number(cpf.charAt(5)) == Number(cpf.charAt(6)) &&
      Number(cpf.charAt(6)) == Number(cpf.charAt(7)) && Number(cpf.charAt(7)) == Number(cpf.charAt(8)) &&
      Number(cpf.charAt(8)) == Number(cpf.charAt(9)) && Number(cpf.charAt(9)) == Number(cpf.charAt(10))) {
        return false;
    } else {
      const primeiroPasso = (Number(cpf.charAt(0)) * 10) +
      (Number(cpf.charAt(1)) * 9) + (Number(cpf.charAt(2)) * 8) +
      (Number(cpf.charAt(3)) * 7) + (Number(cpf.charAt(4)) * 6) +
      (Number(cpf.charAt(5)) * 5) + (Number(cpf.charAt(6)) * 4) +
      (Number(cpf.charAt(7)) * 3) + (Number(cpf.charAt(8)) * 2);
    
      const segundoPasso = primeiroPasso * 10 % 11;
    
      if(Number(cpf.charAt(9)) != segundoPasso) {
        return false;
      } else {
        const primeiroPasso = (Number(cpf.charAt(0)) * 11) +
          (Number(cpf.charAt(1)) * 10) + (Number(cpf.charAt(2)) * 9) +
          (Number(cpf.charAt(3)) * 8) + (Number(cpf.charAt(4)) * 7) +
          (Number(cpf.charAt(5)) * 6) + (Number(cpf.charAt(6)) * 5) +
          (Number(cpf.charAt(7)) * 4) + (Number(cpf.charAt(8)) * 3) +
          (Number(cpf.charAt(9)) * 2);

          const segundoPasso = primeiroPasso * 10 % 11;
        
          if(Number(cpf.charAt(10)) != segundoPasso) {
            return false;
          } else {
            return true;
          }
        }
      }
  }

  cadastrar() {
    const validacao = this.validarCPF(this.cadastro.cpf);
    
    if(this.cadastro.nome != "" && this.cadastro.sobrenome != "" && this.cadastro.cpf != "" && this.cadastro.senha != "" && 
      this.repetirSenha != "" && this.senhasIguais == "iguais" && this.cadastro.cpf.length == 11) {
        if(!validacao) {
          this.alertCPF = true;
        } else {
          console.log("CHUCHU BELEZA")
        }
      } else {
        this.mostrarAviso = true;

        if(this.cadastro.nome == "" && this.cadastro.sobrenome == "" && this.cadastro.cpf == "" && this.cadastro.senha == "" && 
        this.repetirSenha == "") {
          this.aviso = "Para realizar o cadastro, todos os campos acima devem ser preenchidos.";
        } else if (this.cadastro.cpf == "" || this.cadastro.cpf.length < 11) {
          this.aviso = "O campo de 'CPF' está incompleto ou não foi preenchido.";
        } else if (this.cadastro.senha == "" || this.repetirSenha == "" || this.senhasIguais != "iguais") {
          this.aviso = "O campo de 'Senha' ou de 'Digite a senha novamente' não foram preenchidos, ou não foram preenchidos igualmente.";
        } else if (this.cadastro.nome == "" || this.cadastro.nome.length < 3) {
          this.aviso = "O campo de 'Nome' está muito curto ou não foi preenchido.";
        } else if (this.cadastro.sobrenome == "" || this.cadastro.sobrenome.length < 3) {
          this.aviso = "O campo de 'Sobrenome' está muito curto ou não foi preenchido.";
        }
      }
  }

  fechar() {
    this.alertCPF = false;
  }
}

export class CadastroModel {
  nome: string;
  sobrenome: string;
  cpf: string;
  senha: string;

  aula1: boolean = false;
  aula2: boolean = false;
  aula3: boolean = false;
  aula4: boolean = false;
  aula5: boolean = false;
}