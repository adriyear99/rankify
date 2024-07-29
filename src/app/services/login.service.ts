import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) {}

    criarConta(usuario: Usuario) {
        return this.http.post('localhost:8080/api/auth/register', usuario);
    }

    logar(usuario: Usuario) {
        return this.http.post('localhost:8080/api/auth/login', usuario);
    }

}