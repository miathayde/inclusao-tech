import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  modo: string;
  id: number;
  usuario: Usuario = new Usuario();
  aviso: string;
  mostrarAviso: boolean = false;

  senhaAtual: string;
  novaSenha: string;
  repetirSenha: string;
  senhasIguais: string = "vazio";

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.modo = this.route.snapshot.paramMap.get('modo');
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.obterDadosUsuario(this.id);
  }

  verificarSenha() {
    if(this.novaSenha == "" && this.repetirSenha == "") {
      this.senhasIguais = "vazio";
    } else if(this.novaSenha != this.repetirSenha) {
      this.senhasIguais = "diferentes";
    } else if(this.novaSenha == this.repetirSenha) {
      this.senhasIguais = "iguais";
    }
  }

  obterDadosUsuario(id: number) {
    this.usuarioService.obterUsuario(id)
    .subscribe(result => {
      this.usuario = result;
    });
  }

  cancelar() {
    window.open(`http://localhost:4200/sua-conta/${this.id}`,'_self');
  }

  salvar() {
    this.usuarioService.atualizar(this.usuario)
    .subscribe(() => {
      window.open(`http://localhost:4200/sua-conta/${this.id}`,'_self');
    });
  }

  salvarSenha() {
    if(this.senhasIguais == "vazio" || this.senhasIguais == "diferentes") {
      this.aviso = "* Todos os campos devem ser preenchidos.";
      this.mostrarAviso = true;
    } else if(this.usuario.senha != this.senhaAtual) {
      this.aviso = "* A senha atual digitada está incorreta.";
      this.mostrarAviso = true;
    } else {
      this.usuario.senha = this.novaSenha;

      this.salvar();
    }
  }
}
