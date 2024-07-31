import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SharedService {
    apiKey: string = '5f8eea4329c344c4a028ca6a965d3ef7';
    urlBase: string = 'localhost:4200';
    urlBaseLastFm: string = 'https://ws.audioscrobbler.com/2.0';

}