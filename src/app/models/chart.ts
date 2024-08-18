import { Resultado } from "./resultado";

export interface Chart {
    name: string;
    textColor: string;
    backgroundColor: string;
    items: number;
    selectionType: number;
    resultados: Resultado[];
}
