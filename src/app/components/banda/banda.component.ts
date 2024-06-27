import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banda',
  templateUrl: './banda.component.html',
  styleUrls: ['./banda.component.css']
})
export class BandaComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  @Input() nome: string = '';

}
