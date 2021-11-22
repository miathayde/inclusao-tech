import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CursosService {

    private readonly API = 'http://localhost:3000';

    constructor(
        private http: HttpClient
    ) { }

    listarNomeCursos() {
        return this.http.get(`${this.API}/cursos`);
    }

    buscarNomeCurso(id: number) {
        return this.http.get(`${this.API}/cursos/${id}`);
    }

    listarQuestoesCursos(id: number) {
        return this.http.get<any>(`${this.API}/questoesCursos/${id}`);
    }
}

// json-server --watch db.json