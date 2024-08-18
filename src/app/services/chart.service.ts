import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Chart } from "../models/chart";

@Injectable({
    providedIn: 'root'
})

export class ChartService {

    constructor(private http: HttpClient) {}

    saveChart(chart: Chart): Observable<Object> {
        return this.http.post('http://localhost:8080/api/chart', chart,
            {headers: new HttpHeaders()
                .set('Access-Control-Allow-Origin','*')
                .set('Access-Control-Allow-Methods','*')
                .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token')
            }
        );
    }

}