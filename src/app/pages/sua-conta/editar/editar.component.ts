import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  modo: string;
  id: number;

  senhaAtual: string;
  novaSenha: string;
  repetirSenha: string;
  senhasIguais: string = "vazio";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.modo = this.route.snapshot.paramMap.get('modo');
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.id)
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
}
