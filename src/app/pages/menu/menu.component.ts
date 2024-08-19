import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExternalService } from 'src/app/services/external.service';
import { toJpeg } from 'html-to-image';
import { ChartService } from 'src/app/services/chart.service';
import { Chart } from 'src/app/models/chart';
import { Item } from 'src/app/models/item';

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
  title: string = 'My Ranking';
  textColor: string = '#ffffff';
  backgroundColor: string = '#5172e8';
  numberOfItems: number = 1;
  categoriaSelecionada: number = 1;
  category: string = 'track';
  number: string = '';
  stringBusca: string = '';
  resultados: any[] = [];
  lista: Item[] = [];
  token: any = null;
  formStep: number = 1;
  show: boolean = false;
  selectedItem: number = 0;
  listHasStarted: boolean = false;
  msgErro: boolean = false;
  spinner: boolean = false;

  constructor(
    private externalService: ExternalService, 
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.generateSpotifyToken();
    this.generateTemplate();
  }

  generateSpotifyToken() {
    this.externalService.gerarTokenSpotify().subscribe({
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
        this.category = 'track';
        break
      case 2:
        this.category = 'album';
        break
      case 3:
        this.category = 'artist';
        break
      default:
        this.category = 'track';
    }
    this.resetSearch();
    this.generateList();
  }

  generateTemplate() {
    if(this.listHasStarted) { 
      // list already has selected elements
      if(this.lista.length > this.numberOfItems) {
        // user went back and decreased the item size
        const diff = this.lista.length - this.numberOfItems;
        for(let i = 0; i < diff; i++) {
          this.lista.pop();
        }
      } else {
        // user went back and increased the item size
        const diff = this.numberOfItems - this.lista.length;
        for(let i = 1; i <= diff; i++) {
          this.lista.push({
            id: this.lista[this.lista.length-1].id + 1,
            artist: '',
            album: '',
            track: '',
            img: 'https://placehold.co/80x80?text=Cover',
            selected: false
          });
        }
      }
    } else {
      this.generateList();
    }
  }

  generateList() {
    this.lista = new Array(this.numberOfItems);
    for(let i = 0; i < this.numberOfItems; i++) {
      this.lista[i] = {
        id: i + 1,
        artist: '',
        album: '',
        track: '',
        img: 'https://placehold.co/80x80?text=Cover',
        selected: false
      }
    }
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
    this.externalService.getTracks(this.token, this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.tracks.items ? data.tracks.items : [];
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAlbums() {
    this.externalService.getAlbums(this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.results.albummatches.album;
        this.removeAlbumsWithNoNameOrImage();
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

  getArtists() {
    this.externalService.getArtists(this.token, this.stringBusca).subscribe({
      next: (data: any) => {
        this.resultados = data.artists.items;
      }, 
      error: (error) => {
        console.log(error);
      }
    })
  }

  removeAlbumsWithNoNameOrImage() {
    this.resultados = this.resultados.filter((res) => 
      res.name != '(null)' && res.image[2]['#text']
    )
  }

  select(index: number) {
    this.selectedItem = index;
    this.searchElement.nativeElement.focus();
  }

  remove() {
    this.lista[this.selectedItem] = {
      id: this.selectedItem + 1,
      artist: '',
      album: '',
      track: '',
      img: 'https://placehold.co/80x80?text=Cover',
      selected: false
    }
  }

  add(res: any) {
    if(this.categoriaSelecionada == 3) {
      this.lista[this.selectedItem] = {
        id: this.selectedItem + 1,
        artist: res.name,
        album: '',
        track: '',
        img: res.images[2].url,
        selected: true
      };

    } else if(this.categoriaSelecionada == 2) {
      this.lista[this.selectedItem] = {
        id: this.selectedItem + 1,
        artist: res.artist,
        album: res.name,
        track: '',
        img: res.image[2]['#text'],
        selected: true
      };

    } else {
      this.lista[this.selectedItem] = {
        id: this.selectedItem + 1,
        artist: res.artists[0].name,
        album: '',
        track: res.name,
        img: res.album.images[1].url,
        selected: true
      };
    }
    
    this.listHasStarted = true;

    const containsEmptyItem = this.lista.some(item => {
      return !item.selected;
    });

    if(!containsEmptyItem && this.msgErro) {
      this.msgErro = false;
    }
  }

  reset() {
    this.title = 'My Ranking';
    this.textColor = '#ffffff';
    this.backgroundColor = '#5172e8';
    this.category = 'track';
    this.number = '';
    this.formStep = 1;
    this.selectedItem = 0;
    this.listHasStarted = false;
    this.categoriaSelecionada = 1;
    this.numberOfItems = 1;
    this.resultados = [];
    this.show = false;
    this.stringBusca = '';
    this.msgErro = false;
    this.generateList();
  }

  resetSearch() {
    this.resultados = [];
    this.show = false;
    this.stringBusca = '';
  }

  next() {
    this.formStep = 2;
  }

  back() {
    this.msgErro = false;
    this.formStep = 1;
  }

  save() {
    this.spinner = true;
    const chart: Chart = {
      name: this.title != '' ? this.title : 'My Ranking',
      textColor: this.textColor,
      backgroundColor: this.backgroundColor,
      items: this.numberOfItems,
      selectionType: this.categoriaSelecionada,
      resultados: this.lista
    }

    this.chartService.saveChart(chart).subscribe({
      next: (data: any) => {
        console.log(data);
        this.download();
      }, 
      error: (error) => {
        this.spinner = false;
        console.log(error);
      }
    })
  }

  download() {
    const containsEmptyItem = this.lista.some(item => {
      return !item.selected;
    });

    if(containsEmptyItem) {
      this.msgErro = true;
    } else {
      this.msgErro = false;
      this.spinner = true;
      const table = document.getElementById('table');
      toJpeg(table).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'ranking.jpg';
        link.href = dataUrl;
        link.click();
        link.remove();
        this.spinner = false;
      })
      .catch((error) => {
        this.spinner = false;
        console.error('Error downloading image', error);
      });
    }
  }

}
