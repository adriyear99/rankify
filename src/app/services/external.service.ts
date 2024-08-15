import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ExternalService {

    apiKey: string = '5f8eea4329c344c4a028ca6a965d3ef7';
    urlBase: string = 'localhost:4200';
    urlBaseLastFm: string = 'https://ws.audioscrobbler.com/2.0';
    urlBaseContaSpotify: string = 'https://accounts.spotify.com';
    urlBaseSpotify: string = 'https://api.spotify.com';

    constructor(private http: HttpClient) {}

    autorizar() {
        return this.http.get(`http://www.last.fm/api/auth/?api_key=${this.apiKey}=${this.urlBase}`);
    }

    gerarTokenSpotify() {
        const body = new HttpParams()
        .set('grant_type','client_credentials')
        .set('client_id','cc543a1655714be49df681301347ef95')
        .set('client_secret','b696eaa6ea954590b4a4d031b4fb97e8');
        return this.http.post(`${this.urlBaseContaSpotify}/api/token`, body.toString(), 
            {headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')}
        );
    }

    getTracks(token: string, stringBusca: string) {
        const params = new HttpParams({
            fromObject: {
                q: stringBusca,
                type: 'track',
                limit: '24'
            }
        });
        return this.http.get(`${this.urlBaseSpotify}/v1/search`, { params,
            headers: new HttpHeaders()
                .set('Content-Type','application/x-www-form-urlencoded')
                .set('Authorization', token)
        } 
        );
    }

    getAlbums(stringBusca: string) {
        const params = new HttpParams({
            fromObject: {
                method: 'album.search',
                api_key: this.apiKey,
                album: stringBusca,
                limit: 30,
                format: 'json'
            }
        })
        return this.http.get(`${this.urlBaseLastFm}`, {params});
    }

    getArtists(token: string, stringBusca: string) {
        const params = new HttpParams({
            fromObject: {
                q: stringBusca,
                type: 'artist',
                limit: '12'
            }
        });
        return this.http.get(`${this.urlBaseSpotify}/v1/search`, { params,
            headers: new HttpHeaders()
                .set('Content-Type','application/x-www-form-urlencoded')
                .set('Authorization', token)
        } 
        );
    }

}