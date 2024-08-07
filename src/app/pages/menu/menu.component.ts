import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LastFmService } from 'src/app/services/last-fm.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('search') searchElement: ElementRef;

  categories: any = [
    {id: 1, name: 'Tracks'},
    {id: 2, name: 'Albums'},
    {id: 3, name: 'Artists'}
  ];

  values: number[] = [1,2,3,4,5,6,7,8,9,10];
  name: string = 'My Ranking';
  color: string = '#000';
  numberOfItems: number = 1;
  categoriaSelecionada: number = 0;
  categoria: string = 'track';
  numero: string = '';
  stringBusca: string = '';
  resultados: any[] = [];
  lista: any[] = [];
  token: any = null;
  formStep: number = 1;
  show: boolean = false;
  selectedItem: number = 0;

  constructor(private lastFmService: LastFmService) { }

  ngOnInit(): void {
    this.generateSpotifyToken();
    this.gerarTemplate();
  }

  generateSpotifyToken() {
    this.lastFmService.gerarTokenSpotify().subscribe({
      next: (data: any) => {
        this.token = data.token_type + ' ' + data.access_token;
        localStorage.setItem('Authorization', this.token);
      }, 
      error: (error) => {
        console.log(error);
      }
    });
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
    this.resultados = [];
  }

  gerarTemplate() {
    this.lista = new Array(this.numberOfItems);

    for(let i = 0; i < this.numberOfItems; i++) {
      this.lista[i] = {
        artist: 'Artist',
        name: 'Name',
        img: 'Image'
      }
    }
    console.log(this.lista);
  }

  buscar() {
    this.show = true;
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
        this.categoriaSelecionada = 1;
        this.getSongs();
    }
  }

  getSongs() {
    this.lastFmService.buscarMusicas(this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.results ? data.results.trackmatches.track : [];
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

  select(index: number) {
    this.selectedItem = index;
    this.searchElement.nativeElement.focus();
  }

  add(res: any) {
    console.log(res);

    if(this.categoriaSelecionada == 3) {
      this.lista[this.selectedItem] = {
        artist: res.name,
        name: '',
        img: res.images[2].url
      };

    } else {
      this.lista[this.selectedItem] = {
        artist: res.artist,
        name: res.name, 
        img: res.image[1]['#text']
      };
    }
    
    console.log(this.lista);
    this.stringBusca = '';
    this.resultados = [];
    this.show = false;

  }

  reset() {
    this.resultados = [];
    this.show = false;
    this.stringBusca = '';
  }

  next() {
    this.formStep = 2;
  }

  back() {
    this.formStep = 1;
  }

}
