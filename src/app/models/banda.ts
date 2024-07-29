import { Genero } from "./genero";

export interface Banda {
    id: number;
    nome: string;
    qtdMembros: number;
    genero: Genero;
}
