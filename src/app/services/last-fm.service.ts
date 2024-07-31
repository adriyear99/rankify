import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as shared from "./shared.service";

@Injectable({providedIn: 'root'})
export class LastFmService {

    apiKey: string = '5f8eea4329c344c4a028ca6a965d3ef7';
    urlBase: string = 'localhost:4200';
    urlBaseLastFm: string = 'https://ws.audioscrobbler.com/2.0';

    constructor(
        private http: HttpClient
    ) {}

    autorizar() {
        return this.http.get(`http://www.last.fm/api/auth/?api_key=${this.apiKey}=${this.urlBase}`);
    }

    buscarMusicas(stringBusca: string) {
        const params = new HttpParams({
            fromObject: {
                method: 'track.search',
                api_key: this.apiKey,
                track: stringBusca,
                // artist: stringBusca,
                format: 'json'
            }
        })
        return this.http.get(`${this.urlBaseLastFm}`, {params});
    }

    buscarAlbuns(stringBusca: string) {
        const params = new HttpParams({
            fromObject: {
                method: 'album.search',
                api_key: this.apiKey,
                album: stringBusca,
                format: 'json'
            }
        })
        return this.http.get(`${this.urlBaseLastFm}`, {params});
    }

    buscarArtistas(stringBusca: string) {
        const params = new HttpParams({
            fromObject: {
                method: 'artist.search',
                api_key: this.apiKey,
                artist: stringBusca,
                format: 'json'
            }
        })
        return this.http.get(`${this.urlBaseLastFm}`, {params});
    }

}