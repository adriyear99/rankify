import { Component, OnInit } from '@angular/core';
import { LastFmService } from 'src/app/services/last-fm.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categorias: any = [
    {id: 1, nome: 'Músicas'},
    {id: 2, nome: 'Álbuns'},
    {id: 3, nome: 'Artistas'}
  ];

  nome: string = '';
  numeroItens: number = 1;
  categoriaSelecionada: number = 0;
  categoria: string = 'música';
  genero: string = 'a';
  numero: string = '';
  stringBusca: string = '';
  resultados: any[] = [];

  lista: any[] = [];

  constructor(private lastFmService: LastFmService) { }

  ngOnInit(): void {
  }

  checkNumberLimit() {
    if(this.numeroItens < 1) {
      this.numeroItens = 1;
    } else if(this.numeroItens == 1) {
      if(this.categoriaSelecionada == 2) {
        this.categoria = 'álbum';
      }
      this.numero = ''
    } else if(this.numeroItens > 1 && this.numeroItens <= 10) {
      if(this.categoriaSelecionada == 2) {
        this.categoria = 'álbun';
      }
      this.numero = 's';
    } else {
      this.numeroItens = 10;
    }
  }

  checkCategoria() {
    switch(this.categoriaSelecionada) {
      case 1:
        this.genero = 'a';
        this.categoria = 'música';
        break
      case 2:
        this.genero = 'o';
        this.categoria = this.numeroItens == 1 ? 'álbum' : 'álbun';
        break
      case 3:
        this.genero = 'o';
        this.categoria = 'artista';
        break
      default:
        this.categoria = 'música'
    }
  }

  gerarTemplate() {
    this.lista = new Array(this.numeroItens);
  }

  format(text: string) {
    if(text == 'álbum') {
      text = 'álbun';
    }
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
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

  getArtists() {
    this.lastFmService.buscarArtistas(this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.results.artistmatches.artist;
        console.log(this.resultados);
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

}
