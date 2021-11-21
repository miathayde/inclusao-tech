import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastro: Usuario = new Usuario();
  repetirSenha: string;
  senhasIguais: string = "vazio";
  aviso: string = "";
  avisoCpf: string = "";
  mostrarAviso: boolean = false;
  alertCPF: boolean = false;
  id: any;
  usuarios: any;

  constructor(
    private service: UsuariosService
  ) {
    
   }

  ngOnInit(): void {
    this.cadastro.cpf = "";
    this.cadastro.nome = "";
    this.cadastro.sobrenome = "";
    this.cadastro.senha = "";
    this.repetirSenha = "";

    this.obterUsuarios();
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
    const cpfCadastrado = this.usuarios.find(x => x.cpf == this.cadastro.cpf);
    
    if(this.cadastro.nome != "" && this.cadastro.sobrenome != "" && this.cadastro.cpf != "" && this.cadastro.senha != "" && 
      this.repetirSenha != "" && this.senhasIguais == "iguais" && this.cadastro.cpf.length == 11) {
        if(!validacao || cpfCadastrado) {
          this.alertCPF = true;
          this.aviso = "";

          if(!validacao) {
            this.avisoCpf = "O CPF digitado é inválido! Por favor, verifique e digite novamente o CPF.";
          } else if(cpfCadastrado) {
            this.avisoCpf = "O CPF digitado já está cadastrado.";
          }

          document.documentElement.scrollTop = 0;

          setTimeout(() => {
            this.alertCPF = false;
          }, 9000);
        } else {
          this.submeterCadastro();
          this.direcionarRota();
        }
      } else {
        this.mostrarAviso = true;

        if(this.cadastro.nome == "" || this.cadastro.sobrenome == "" || this.cadastro.cpf == "" || this.cadastro.senha == "" || 
        this.repetirSenha == "") {
          this.aviso = "* Para realizar o cadastro, todos os campos acima devem ser preenchidos.";
        } else if (this.cadastro.cpf == "" || this.cadastro.cpf.length < 11) {
          this.aviso = "* O campo de 'CPF' está incompleto ou não foi preenchido.";
        } else if (this.cadastro.senha == "" || this.repetirSenha == "" || this.senhasIguais != "iguais") {
          this.aviso = "* O campo de 'Senha' ou de 'Digite a senha novamente' não foram preenchidos, ou não foram preenchidos igualmente.";
        } else if (this.cadastro.nome == "" || this.cadastro.nome.length < 3) {
          this.aviso = "* O campo de 'Nome' está muito curto ou não foi preenchido.";
        } else if (this.cadastro.sobrenome == "" || this.cadastro.sobrenome.length < 3) {
          this.aviso = "* O campo de 'Sobrenome' está muito curto ou não foi preenchido.";
        }
      }
  }

  submeterCadastro() {
    this.cadastro.aula1 = false;
    this.cadastro.aula2 = false;
    this.cadastro.aula3 = false;
    this.cadastro.aula4 = false;
    this.cadastro.aula5 = false;
    console.log(this.cadastro)

    this.service.criar(this.cadastro).subscribe(
      success => {
        console.log('sucesso');
        this.cadastro = new Usuario();
        this.senhasIguais = "";
      },
      error => console.error(error),
      () => console.log('request completo')
    );
  }

  fechar() {
    this.alertCPF = false;
  }

  direcionarRota() {
    this.id = Math.max(...this.usuarios.map(x => x.id));
    this.id = Number(this.id) + 1;
    console.log(this.id)

    window.open(`http://localhost:4200/sua-conta/${this.id}`,'_self');
  }

  obterUsuarios() {
    let usuarios = [];

    this.service.listar().subscribe(
      result => {
        usuarios = usuarios.concat(result);
        this.usuarios = usuarios;
      }
    );
  }
}