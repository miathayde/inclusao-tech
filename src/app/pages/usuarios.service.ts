import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "./models/usuario";
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private readonly API = 'http://localhost:3000/usuarios';

    constructor(
        private http: HttpClient
    ) { }

    listar() {
        return this.http.get<Usuario[]>(this.API);
    }

    criar(usuario) {
        return this.http.post(this.API, usuario).pipe(take(1));
    }

    atualizar(usuario: Usuario) {
        return this.http.put(`${this.API}/${usuario.id}`, usuario);
    }

    obterUsuario(id: number) {
        return this.http.get<Usuario>(`${this.API}/${id}`);
    }
}

// json-server --watch db.json

// Modos de salvar andamento do curso:
// iniciado (pode clicar e pendente)
// não iniciado (não pode clicar e pendente)
// em andamento (após clicar em dar continuidade na tela de video)
// concluido (libera proximo curso)