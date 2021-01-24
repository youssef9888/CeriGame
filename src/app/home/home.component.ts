import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   
   // Nom et prénom de l'utilisateur connecté
   nom: String;
   prenom: String;


  constructor(private loginService : LoginService , private router : Router) {

  }

  ngOnInit(): void {
  	this.nom = JSON.parse(localStorage.getItem('user')).nom;
  	this.prenom = JSON.parse(localStorage.getItem('user')).prenom;

  }

  commencer(){
    // commencer le quiz
    this.router.navigate(['quiz']);
  }

}
