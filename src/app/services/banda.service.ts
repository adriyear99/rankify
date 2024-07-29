import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BandaService {

    constructor(private http: HttpClient) {}

    getBandas(): Observable<Object> {
        return this.http.get('localhost:8080/bandas');
    }

}