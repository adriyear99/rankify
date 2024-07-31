import { Component, OnInit } from '@angular/core';
import { LastFmService } from 'src/app/services/last-fm.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categorias: any = [
    {id: 1, nome: 'Tracks'},
    {id: 2, nome: 'Albums'},
    {id: 3, nome: 'Artists'}
  ];

  nome: string = '';
  numeroItens: number = 1;
  categoriaSelecionada: number = 0;
  categoria: string = 'track';
  numero: string = '';
  stringBusca: string = '';
  resultados: any[] = [];
  lista: any[] = [];
  token: any = null;

  constructor(private lastFmService: LastFmService) { }

  ngOnInit(): void {
    this.generateSpotifyToken();
  }

  generateSpotifyToken() {
    this.lastFmService.gerarTokenSpotify().subscribe({
      next: (data: any) => {
        this.token = data.token_type + ' ' + data.access_token;
        localStorage.setItem('Authorization', this.token);
        console.log(this.token);
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }

  checkNumberLimit() {
    if(this.numeroItens < 1) {
      this.numeroItens = 1;
    } else if(this.numeroItens == 1) {
      this.numero = ''
    } else if(this.numeroItens > 1 && this.numeroItens <= 10) {
      this.numero = 's';
    } else {
      this.numeroItens = 10;
    }
  }

  checkCategoria() {
    switch(this.categoriaSelecionada) {
      case 1:
        this.categoria = 'song';
        break
      case 2:
        this.categoria = 'album';
        break
      case 3:
        this.categoria = 'artist';
        break
      default:
        this.categoria = 'song';
    }
  }

  gerarTemplate() {
    this.lista = new Array(this.numeroItens);
  }

  format(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1) + 's';
  }

  buscar() {
    switch(this.categoriaSelecionada) {
      case 1:
        this.getSongs();
        break
      case 2:
        this.getAlbums();
        break
      case 3:
        this.getArtists();
        break
      default:
        this.getSongs();
    }
  }

  getSongs() {
    this.lastFmService.buscarMusicas(this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.results.trackmatches.track;
        console.log(this.resultados);
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAlbums() {
    this.lastFmService.buscarAlbuns(this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.results.albummatches.album;
        console.log(this.resultados);
        this.removeAlbumsWithNoNameOrImage();
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

  // getArtists() {
  //   this.lastFmService.buscarArtistas(this.stringBusca).subscribe({
  //     next: (data: any) => {
  //       this.resultados = data.results.artistmatches.artist;
  //       console.log(this.resultados);
  //     }, 
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  getArtists() {
    this.lastFmService.buscarArtistas(this.token, this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.artists.items;
        console.log(this.resultados);
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

  removeAlbumsWithNoNameOrImage() {
    this.resultados = this.resultados.filter((res) => 
      res.name != '(null)' && res.image[1]['#text']
    )

    console.log(this.resultados);
  }

}
