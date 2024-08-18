import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Chart } from "../models/chart";

@Injectable({
    providedIn: 'root'
})

export class ChartService {

    constructor(private http: HttpClient) {}

    saveChart(chart: Chart): Observable<Object> {
        return this.http.post('localhost:8080/api/chart', chart);
    }

}