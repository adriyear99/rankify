import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { LastFmService } from 'src/app/services/last-fm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string = '';

  apiKey: string = '5f8eea4329c344c4a028ca6a965d3ef7';
  urlBase: string = 'localhost:4200';

  constructor(
    private loginService: LoginService,
    private lastFmService: LastFmService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login: Usuario = {
    email: '',
    senha: '',
  }

  logar() {
    console.log(this.login);
    this.router.navigate(['/menu']);
    this.lastFmService.autorizar().subscribe({
      next: (data) => {
        console.log(data);
        // this.token = data;
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }

}
