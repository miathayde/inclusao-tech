import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cpf: string;
  senha: string;
  usuarios: any;
  mostrarAviso: boolean = false;

  constructor(private service: UsuariosService) { }

  ngOnInit(): void {
    this.obterUsuarios();
  }

  entrar() {
    var usuario = this.usuarios.find(x => x.cpf == this.cpf && x.senha == this.senha);
    
    if(usuario) {
      window.open(`http://localhost:4200/sua-conta/${usuario.id}`,'_self');
    } else {
      this.mostrarAviso = true;
    }
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
