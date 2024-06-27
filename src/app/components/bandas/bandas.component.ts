import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bandas',
  templateUrl: './bandas.component.html',
  styleUrls: ['./bandas.component.css']
})
export class BandasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  bands: string[] = ['Bad Omens', 'Sleep Token', 'Bring Me The Horizon'];

}
